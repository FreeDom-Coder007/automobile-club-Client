import React from 'react';
import './Banner.css';
import hondaBanner from '../../../Assests/Photos/honda-cbr150r-f02-removebg-preview.png'; 

const Banner = () => { 
    return ( 
        <div className="banner hero rounded-lg">
          <div className="hero-content flex-col gap-x-28 lg:flex-row-reverse">
           <img className="shadow-2xl lg:w-1/2" src={hondaBanner} alt='honda CBR'/>
           <div className='text-center lg:text-left text-slate-200'>
            <h1 className="text-5xl font-bold">Buy, Sell</h1>
            <h1 className="text-5xl font-bold">Your Car, Bike</h1> 
            <p className="py-6 text-3xl">A reliable marketplace Automobiles sell and Buy</p> 
           </div>
          </div>
        </div> 
    ) 
}

export default Banner;