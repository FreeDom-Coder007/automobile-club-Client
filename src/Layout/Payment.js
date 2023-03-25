import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'; 
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51M63n1Emfx3wQiTwupbwmiQBCCL95B3p8TbedCYQ768K3jzWb5SdbP2OxBVk9n8h2HqAVDXuZnoIGzD3M8SqGqTk00XGuD5rTc')

const Payment = () => {
    const myBooking = useLoaderData()
    console.log(myBooking)

    return (
        <div>
            <h1 className='text-4xl font-semibold'>Pay <strong>{myBooking.resellPrice}</strong> for {myBooking.productName}</h1> 
            <div className='my-6 border'>
              <Elements stripe={stripePromise}>
                <CheckoutForm myBooking={myBooking} />
              </Elements>
            </div>
        </div>
    )

}

export default Payment;