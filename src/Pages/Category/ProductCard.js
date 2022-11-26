import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

const ProductCard = ({product, setProductInfo}) => {
    const {image, location, name, original_price, resell_price, seller_name, years_of_use} = product

    return (
        <div className="card w-64 bg-base-100 shadow-xl">
          <figure className="px-2 pt-8">
            <img src={image} alt="Motor bike" className="rounded-xl"/>
          </figure>
          <div className="card-body">
           <h2 className="card-title">{name}</h2>
           <p className='flex items-center'><FaMapMarkerAlt className='mr-2'/> <small>{location}</small></p>
           <p className='font-semibold'><small>Original Price: ${original_price}</small></p>
           <p className='font-semibold'><small>Resell Price: ${resell_price}</small></p>
           <p className='font-semibold'><small>Seller Name: {seller_name}</small></p>
           <p className='font-semibold'><small>Used duration: {years_of_use}</small></p>
           <div className="card-actions"> 
             <label onClick={() => setProductInfo({name, resell_price})} htmlFor="booking-modal" className="btn bg-black">Book Now</label>
           </div>
          </div>
        </div>
    );
};

export default ProductCard;