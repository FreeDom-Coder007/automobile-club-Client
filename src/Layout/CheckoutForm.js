import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useState } from "react";

const CheckoutForm = ({myBooking}) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState('')
  const [processing, setProcessing] = useState(false)
  const [transectionId, setTransectionId] = useState('')

  const stripe = useStripe();
  const elements = useElements();
  const { resellPrice, _id, name, email } = myBooking

  useEffect(() => { 
    fetch('https://bike-re-sale-server.vercel.app/create-payment-intent', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({resellPrice}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [resellPrice]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if(error){
      console.log(error);
      setCardError(error.message);
    }
    else{
        setCardError('')
    }
    setSuccess('')
    setProcessing(true)
    
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    name: name,
                    email: email 
                }
            }
        }
    )

    if(confirmError){
       setCardError(confirmError.message)
       return; 
    }
    if(paymentIntent.status === 'succeeded'){
       console.log('card info', card)
       
       const payment = {
          resellPrice,
          transectionId: paymentIntent.id,
          email,
          bookingId: _id
       }
       fetch(`https://bike-re-sale-server.vercel.app/payments`,{
         method: 'POST',
         headers: {
            'content-type': 'application/json',
             authorization: `bearer ${localStorage.getItem('AccessToken')}` 
         },
         body: JSON.stringify(payment)
       })
       .then(res => res.json())
       .then(data => {
         console.log(data);
         if(data.insertedId){
            setSuccess('Congrats! your payment completed');
            setTransectionId(paymentIntent.id);
         }
       })
    }
    setProcessing(false)

  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-sm bg-black mt-4" type="submit" 
         disabled={!stripe || !clientSecret || processing}>Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {
         success && 
         <div>
            <p className='text-green-500'>{success}</p>
            <p>Your transactionId: <span className='font-bold'>{transectionId}</span></p>
        </div>
      }
    </React.Fragment>
  )
}

export default CheckoutForm;
