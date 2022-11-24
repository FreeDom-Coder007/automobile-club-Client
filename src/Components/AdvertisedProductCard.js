import React from 'react';
import { BiPurchaseTag } from "react-icons/bi";


const AdvertisedProductCard = ({product}) => {
    const {image, name} = product 

    return (
       <div>
          <div className="card w-80 bg-base-100 shadow-xl">
            <figure><img className='w-80' src={image} alt={name} /></figure>
            <div className="card-actions justify-center mb-3">
              <button className="btn bg-black"><BiPurchaseTag className='text-xl mr-2'/> Buy Now</button>
            </div>
          </div>
          <h1 className='text-2xl font-bold text-center mt-3'>{name}</h1>
       </div>
    )
}

export default AdvertisedProductCard;