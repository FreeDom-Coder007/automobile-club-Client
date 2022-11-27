// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import React, { useEffect } from "react";
// import { useState } from "react";

// const CheckoutForm = ({myItem}) => {
//   const [cardError, setCardError] = useState("");
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();

//   const { resellPrice } = myItem

//   useEffect(() => { 
//     fetch('http://localhost:4000/create-payment-intent', {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json" 
//       },
//       body: JSON.stringify({resellPrice}),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [resellPrice]);


//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     if (card === null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log(error);
//       setCardError(error.message);
//     }
//   };

//   return (
//     <React.Fragment>
//       <form onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <button className="btn btn-sm bg-black mt-4" type="submit" disabled={!stripe || !clientSecret}>Pay</button>
//       </form>
//       <p className="text-red-500">{cardError}</p>
//     </React.Fragment>
//   );
// };

// export default CheckoutForm;
