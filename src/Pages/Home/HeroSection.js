import React from 'react';
import suzkiGSX from '../../Assests/logo/suzuki-gsx-r150-img-a1-removebg-preview.png';
import { FaCheckCircle, FaCheck, FaSearchLocation, FaHeart } from "react-icons/fa";


const HeroSection = () => {
    return (
        
    <div>
        <h1 className='text-center text-6xl font-bold'>Our Goals</h1>
        <div className='divider'></div> 
        <div className="hero-section hero py-20">   
         <div className="flex flex-col lg:justify-between lg:flex-row">
          <img src={suzkiGSX} alt='Suzuki GSX' className="rounded-lg mr-20"/>
          <div className='lg:w-1/2 ml-28'>
           <h1 className="text-3xl font-bold mb-1">We are not just selling the Bike!</h1>
           <h1 className="text-3xl font-bold flex mb-4">We also Ensure<FaCheck/></h1>
           <div className='py-5'>
             <h1 className='flex items-center text-3xl mb-5'><FaCheckCircle className='mr-2 text-teal-500'/><span className='font-semibold'>Products Quality</span></h1>
             <h1 className='flex items-center text-3xl mb-5'><FaSearchLocation className='mr-2 text-amber-500'/><span className='font-semibold'>Products Authenticity</span></h1>
             <h1 className='flex items-center text-3xl mb-5'><FaHeart className='mr-2 text-pink-800'/><span className='font-semibold'>Your Trust</span></h1>
           </div>
          </div>
         </div>
        </div>
    </div>
        
    );
};

export default HeroSection;