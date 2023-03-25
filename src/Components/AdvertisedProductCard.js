import React from 'react'; 
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const AdvertisedProductCard = ({product}) => {
    const {image, name, category_name} = product  
    
    const [category, setCategory] = useState({})
    useEffect(() => {
      fetch(`https://bike-re-sale-server.vercel.app/category?categoryName=${category_name}`)
      .then(res => res.json())
      .then(data => setCategory(data))
    },[category_name])
    console.log(category)

    return (
       <div>
          <div className="card w-80 bg-base-100 shadow-xl">
            <figure><img className='w-80' src={image} alt={name} /></figure>
            <div className="card-actions justify-center mb-3">
              <Link to={`/category/${category._id}`}><button className="btn bg-black">See All</button></Link>
            </div>
          </div>
          <h1 className='text-2xl font-bold text-center mt-3'>{name}</h1>
       </div>
    )
}

export default AdvertisedProductCard;