import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertisedProductCard from '../../Components/AdvertisedProductCard';

const AdvertisedItems = () => {

    const {data: advertisedProdcuts = []} = useQuery({
        queryKey: ['advertisedProdcuts'],
        queryFn: async() => {
            const res = await fetch(`http://localhost:5000/advertised-products`)
            const data = await res.json()
            return data
        }
    })

    return (
        <div className='advertisement-section py-8'>
            <h1 className='my-2 text-4xl font-semibold mx-6'>Advertised items</h1>
            <p className='text-3xl text-red-600 ml-6'>20% Off in Every Products</p>
            <div className="divide-black"></div>
            <div className='advertised-product-containe grid grid-cols-1 justify-items-center lg:grid lg:grid-cols-3 lg:gap-x-4 lg:gap-y-5 my-8'>
              {
                advertisedProdcuts.map(product => <AdvertisedProductCard key={product._id} product={product}/>)
              }
            </div>
        </div>
    )
}

export default AdvertisedItems;