import React from "react";
import {ElementsConsumer, CardElement} from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import {useSelector, useDispatch} from "react-redux";
import {stripeDataPlanid , stripeCoinDataPlanid ,stripeCoinPlanId , stripePlanId , profile} from "../features/userSlice";
import {ACTIVATE_STRIPE_PACKAGE , ACTIVATE_COIN_PACKAGE , GET_LOGGEDPROFILE_API} from "./Api";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios";
import { useHistory } from "react-router-dom";

const CheckoutForm = (props) => {
    const history = useHistory();
    const Selected_Stripe_planid = useSelector(stripeDataPlanid);
    const Selected_Stripe_coinid = useSelector(stripeCoinDataPlanid);

    const dispatch = useDispatch();
    var sessionId = localStorage.getItem("session_id")
   const profileData =() =>{
    const bodyParameters = {
        session_id: sessionId,
        };
          axios.post(GET_LOGGEDPROFILE_API,bodyParameters)
          .then((response) => {
          dispatch (
              profile ({
                  profile : response.data.data
              })
          );
          } ,(error)=> {

          })
   } 

    const handleSubmit = async event => {
        event.preventDefault();
        const {stripe, elements} = props;
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        
        if (result.error) {
            console.log(result.error.message);
            createNotification('error',result.error.message);
        } else {
             // Activating VIP Membership here
            if(!!Selected_Stripe_planid){
            // console.log(result.token.id);
            const bodyParameters = {
                session_id: sessionId,
                plan_id: Selected_Stripe_planid,
                token: result.token.id
            }
            axios
                .post(ACTIVATE_STRIPE_PACKAGE, bodyParameters)
                .then((response) => {
                  
                    if(response.status==200)
                    { 
                    console.log(response);
                    createNotification('success',response.message);
                    dispatch(stripePlanId({stripePlanId: null}));
                  }
                }, (error) => {
                    if (error.toString().match("403")) {
                        localStorage.removeItem("session_id");
                        history.push('/login');
                      }
                    createNotification('error',error.message);
                });
        }

        // Activating coin package here
        if(!!Selected_Stripe_coinid)
        {
            const bodyParameters = {
                session_id: sessionId,
                coins_package_id: Selected_Stripe_coinid,
                token: result.token.id
            }
            axios
                .post(ACTIVATE_COIN_PACKAGE, bodyParameters)
                .then((response) => { 
                    // if(response.error=="bad_request")
                    // {
                    //   localStorage.removeItem("session_id");
                    //   history.push('/login');
                    // }
                    if(response.status==200)
                    { 
                        console.log(response);
                        createNotification('sucess-coin',response.message);
                        dispatch(stripeCoinPlanId({stripeCoinPlanId: null}));
                        profileData();
                  }
               
                }, (error) => {
                    if (error.toString().match("403")) {
                        localStorage.removeItem("session_id");
                        history.push('/login');
                      }
                    createNotification('error',error.message);
                });
        }
    }
    };

    const createNotification = (type,message) => {
  
        switch (type) {
          case 'success':
            NotificationManager.success(message, 'You have subscribed the Package', 3000, () => {
            });
            break;
          case 'error':
            NotificationManager.error(message, 'Please check your card details', 3000, () => {
            });
            break; 
            case 'sucess-coin':
            NotificationManager.success(message, 'Your coin package activated', 3000, () => {
            });
      };
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardSection/>
                <button disabled={!props.stripe} className="btn-pay">
                    Buy Now
                </button>
            </form>
            <NotificationContainer />
        </div>
    );

}

export default function InjectedCheckoutForm() {
    return (
        <ElementsConsumer>
            {({stripe, elements}) => (<CheckoutForm stripe={stripe} elements={elements}/>)}
        </ElementsConsumer>
    );
}