import React from 'react';
import './Banner.css';
import hondaBanner from '../../../Assests/Photos/honda-cbr150r-f02-removebg-preview.png';
import promotIcon from '../../../Assests/Icons/promotion-svgrepo-com .svg';

const Banner = () => {
    return (

        <div className="banner hero">
         <div className="hero-content flex-col lg:flex-row-reverse">
          <img className="shadow-2xl lg:w-1/2" src={hondaBanner} alt='honda CBR'/>
          <div className='text-center lg:text-left text-slate-200'>
           <h1 className="text-5xl font-bold">Buy, Sell, Exchange</h1>
           <h1 className="text-5xl font-bold">Your Bike</h1> 
           <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
           <button className="btn bg-gradient-to-r from-gray-200 to-slate-500 hover:from-slate-500 hover:to-gray-200 text-white flex items-center"><img className='w-6 mr-2' src={promotIcon} alt="promote" /><span>Advertise</span></button>
          </div>
         </div>
        </div>

    )
}

export default Banner;