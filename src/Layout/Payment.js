// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import React from 'react';
// import { useLoaderData } from 'react-router-dom';
// import CheckoutForm from './CheckoutForm';


// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

// const Payment = () => {
//     const myItem = useLoaderData()
//     console.log(myItem)

//     return (
//         <div>
//             <h1 className='text-4xl font-semibold'>Pay <strong>{myItem.resellPrice}</strong> for {myItem.productName}</h1> 
//             <div className='my-6 border'>
//               <Elements stripe={stripePromise}>
//                 <CheckoutForm myItem={myItem} />
//               </Elements>
//             </div>
//         </div>
//     )

// }

// export default Payment;