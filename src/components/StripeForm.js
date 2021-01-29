import React from "react";
import { useDispatch } from 'react-redux';
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

const CheckoutForm = (props) =>{
    const dispatch = useDispatch();
 const handleSubmit = async event => {
    event.preventDefault();

    console.log(props,"curentStripePlan.....")
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);  
     
    }
  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <CardSection />
          <button disabled={!props.stripe} className="btn-pay">
            Buy Now
          </button>
        </form>
      </div>
    );

}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}