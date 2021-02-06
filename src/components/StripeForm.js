import React from "react";
import {ElementsConsumer, CardElement} from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import {useSelector} from "react-redux";
import {stripeDataPlanid , stripeCoinDataPlanid} from "../features/userSlice";
import {ACTIVATE_STRIPE_PACKAGE , ACTIVATE_COIN_PACKAGE} from "./Api";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios";

const CheckoutForm = (props) => {

    const Selected_Stripe_planid = useSelector(stripeDataPlanid);
    const Selected_Stripe_coinid = useSelector(stripeCoinDataPlanid);
    var sessionId = localStorage.getItem("session_id")
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
                  }
             
                }, (error) => {});
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
                    if(response.status==200)
                    { 
                        console.log(response);
                        createNotification('coin',response.message);
                  }
               
                }, (error) => {});
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