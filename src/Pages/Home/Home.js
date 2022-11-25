import React from 'react'; 
import AdvertisedItems from './AdvertisedItems';
import Banner from './Banner/Banner';
import HeroSection from './HeroSection';
import ProductCategories from './ProductCategories';


const Home = () => {
    return (
        <div>
         <Banner/>
         <AdvertisedItems/>
         <ProductCategories/>
         <HeroSection/> 
        </div>
    )
}

export default Home;