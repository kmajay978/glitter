import React from "react";
import {ElementsConsumer, CardElement} from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import {useSelector} from "react-redux";
import {stripeDataPlanid} from "../features/userSlice";
import {ACTIVATE_STRIPE_PACKAGE} from "./Api";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from "axios";

const CheckoutForm = (props) => {

    const Selected_Stripe_planid = useSelector(stripeDataPlanid);
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
            // console.log(result.token.id);
            const bodyParameters = {
                session_id: sessionId,
                plan_id: Selected_Stripe_planid,
                token: result.token.id
            }
            axios
                .post(ACTIVATE_STRIPE_PACKAGE, bodyParameters)
                .then((response) => {

                    createNotification('success',response.message);
                }, (error) => {});
        }
    };

    const createNotification = (type,message) => {
  
        switch (type) {
          case 'success':
            NotificationManager.success(message, 'You have subscribed the Package');
            break;
          case 'error':
            NotificationManager.error(message, 'Please check your card details', 5000, () => {
            });
            break; 
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