import React from 'react';
import yamaha from '../../Assests/logo/yamaha-logo.svg';
import honda from '../../Assests/logo/honda-logo.svg';
import ktm from '../../Assests/logo/ktm-logo.svg';
import suzuki from '../../Assests/logo/suzuki.svg'; 
import { Link } from 'react-router-dom';


const SecondHandProducts = () => { 

    const brandsData = [
        {
            id: 1,
            image: yamaha,
            name: 'Yamaha' 
        },
        {
            id: 2,
            image: honda,
            name: 'Honda' 
        },
        {
            id: 3,
            image: ktm,
            name: 'KTM' 
        },
        {
            id: 4,
            image: suzuki,
            name: 'Suzuki' 
        }
    ]

    return (
        <div className=' py-10'>
            <h1 className='my-2 text-4xl font-bold mx-6 mb-5'>Prodcut Categories</h1>
            <div className="divider"></div> 
            <div className='brand-container grid grid-cols-1 justify-items-center lg:grid lg:grid-cols-4 gap-y-8'>
              {
                brandsData.map(brand =>
                 <Link key={brand.id}>    
                  <div key={brand.id} className="card w-44 shadow-xl border-t p-6">
                   <figure><img className='w-32' src={brand.image} alt={brand.name}/></figure>
                   <h1>{brand.name}</h1>
                  </div>
                 </Link>)
              }
            </div>
        </div>
    )
}

export default SecondHandProducts;