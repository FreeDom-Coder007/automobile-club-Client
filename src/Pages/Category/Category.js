import React from 'react';
import { useState } from 'react'; 
import { useLoaderData } from 'react-router-dom'; 
import ProductCard from './ProductCard';
import ProductBookingModal from './ProductBookingModal'; 
import { useQuery } from '@tanstack/react-query';


const Category = () => { 
    const productCategory = useLoaderData()
    const {category_logo, category_name} = productCategory
    const [productInfo, setProductInfo] = useState({}) 
    
    const {data: products = [], refetch} = useQuery({
       queryKey: ['products', category_name],
       queryFn: async () => {
         const res = await fetch(`http://localhost:4000/products?categoryName=${category_name}`)
         const data = res.json()
         return data;
       }
    }) 


    return (
      <section>  
        <div className="bg-white bg-gradient-to-r from-gray-900 to-gray-600">
         <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
             <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{category_name}</h1>
             <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their payment stack.</p>
          </div>
          <div className="hidden lg:mt-0 lg:ml-20 lg:col-span-3 lg:flex">
             <img src={category_logo} alt="mockup"/>
          </div>                
         </div>
        </div>
        { products?.length ?
         <div className='products-container border max-w-[1240px] my-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-x-2 gap-y-10'>
          {  
            products?.map(product => <ProductCard key={product._id} product={product} setProductInfo={setProductInfo}/>) 
          }
         </div>
         :
         <h1 className='text-center text-5xl font-semibold my-10'>No Items available in this category</h1> 
        }
        {productInfo && <ProductBookingModal refetch={refetch} productInfo={productInfo} setProductInfo={setProductInfo}/>}
      </section>     
    )
}

export default Category;