import React, { useState } from "react";
import {ElementsConsumer, CardElement} from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import {useSelector, useDispatch} from "react-redux";
import {stripeDataPlanid , stripeCoinDataPlanid ,stripeCoinPlanId , stripePlanId , profile} from "../features/userSlice";
import {ACTIVATE_STRIPE_PACKAGE , ACTIVATE_COIN_PACKAGE , GET_LOGGEDPROFILE_API} from "./Api";
import { NotificationManager} from 'react-notifications';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ClipLoader} from "react-spinners";
import { css } from "@emotion/core";

const override = css`
    
text-align: center;
width: 40px;
height: 40px;
position: absolute;
left: 0;
right: 0;
margin: 0 auto;
// padding-top:60px;
top: 71%;
-webkit-transform: translateY(-50%);
-moz-transform: translateY(-50%);
transform: translateY(-50%);
`;

const CheckoutForm = (props) => {
    const history = useHistory();
    const Selected_Stripe_planid = useSelector(stripeDataPlanid);
    const Selected_Stripe_coinid = useSelector(stripeCoinDataPlanid);
    const [isLoading, setIsloading] = useState(false);

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
            NotificationManager.error(error.message, "", 2000, () => {return 0}, true);
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
            NotificationManager.error(result.error.message, "", 2000, () => {return 0}, true);
        } else {
             // Activating VIP Membership here
            if(!!Selected_Stripe_planid){
                setIsloading(true)
            const bodyParameters = {
                session_id: sessionId,
                plan_id: Selected_Stripe_planid,
                token: result.token.id
            }
            const stripeClose = document.getElementById("stripe-close");
            axios
                .post(ACTIVATE_STRIPE_PACKAGE, bodyParameters)
                .then((response) => {
                    setIsloading(false)
                  
                    if(response.status==200)
                    { 
                    NotificationManager.success( "You have subscribed the Package", "", 2000, () => {return 0}, true);
                    dispatch(stripePlanId({stripePlanId: null}));
                    profileData();
                  }
                  stripeClose.click();
                }, (error) => {
                    setIsloading(false);
                    NotificationManager.error(error.message, "", 2000, () => {return 0}, true);
                    if (error.toString().match("403")) {
                        localStorage.removeItem("session_id");
                        history.push('/login');
                      }
                   
                    stripeClose.click();
                });
             
        }

        // Activating coin package here
        if(!!Selected_Stripe_coinid)
        {
            setIsloading(true);
            const bodyParameters = {
                session_id: sessionId,
                coins_package_id: Selected_Stripe_coinid,
                token: result.token.id
            }
            const stripeClose = document.getElementById("stripe-close")
            axios
                .post(ACTIVATE_COIN_PACKAGE, bodyParameters)
                .then((response) => { 
                    setIsloading(false);
                    if(response.status==200)
                    { 
                        NotificationManager.success( "Your coin package activated", "", 2000, () => {return 0}, true);
                        dispatch(stripeCoinPlanId({stripeCoinPlanId: null}));
                        profileData();
                  }
               stripeClose.click();
                }, (error) => {
                    setIsloading(false);
                    NotificationManager.error(error.message, "", 2000, () => {return 0}, true);
                    if (error.toString().match("403")) {
                        localStorage.removeItem("session_id");
                        history.push('/login');
                      }
                   stripeClose.click();
                });
        }
       
    }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardSection/>
                <button disabled={(isLoading || !props.stripe) ? true : false} className="btn-pay">
                
                        {
                            isLoading ? <ClipLoader color={"#fff"} loading={isLoading} css={override} />
                            :
                            "Buy Now"
                        }
                        
                </button>
            </form>
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