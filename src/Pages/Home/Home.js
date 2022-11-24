import React from 'react'; 
import AdvertisedItems from './AdvertisedItems';
import Banner from './Banner/Banner';
import HeroSection from './HeroSection';
import SecondHandProducts from './SecondHandProducts';


const Home = () => {
    return (
        <div>
         <Banner/>
         <AdvertisedItems/>
         <SecondHandProducts/>
         <HeroSection/> 
        </div>
    )
}

export default Home;