import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51LieRcEzDf3Cqf0Ap0cCeE8ei7BmausqJOgJVRwBbDTQ7oNy5CrVFfiLrrEiKJP3nG8yGi7F7DuV1FGMGhMMRIJ900EomPOTZj';


    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
           label='Pay Now'
           name='CRWN Clothing Ltd.'
           billingAddress
           shippingAddress
           image='https://sendeyo.com/up/d/f3eb2117da'
           description={`Your total is ${price}`}
           amount={priceForStripe}
           panelLabel='Pay Now'
           token={onToken}
           stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton; 