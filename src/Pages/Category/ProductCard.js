import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt } from "react-icons/fa"; 
import { MdReport } from "react-icons/md"; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const ProductCard = ({product, setProductInfo}) => {
   const {user} = useContext(AuthContext)  
   const {image, location, product_name, original_price, resell_price, seller_name, purchase_year, upload_time} = product
    

   const handleReportItem = (product) => { 
      fetch('https://bike-re-sale-server.vercel.app/reported-products', {
          method: 'POST',
          headers: {
             'content-type': 'application/json'
          },
          body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(data => {
         console.log(data)
         if(data.acknowledged){
            toast.success('report submited')
         }
      }) 
   }

    return (
        <div className="card w-64 bg-base-100 shadow-xl">
          <figure className="px-2 pt-8">
            <img src={image} alt="Motor bike" className="rounded-xl"/>
          </figure>
          <div className="card-body">
           <h2 className="card-title">{product_name}</h2> 
           <p className='font-semibold'><small>Original Price: {original_price}</small></p>
           <p className='font-semibold'><small>Resell Price: {resell_price}</small></p>
           <p className='font-semibold'><small>Seller Name: {seller_name}</small></p>
           <p className='font-semibold'><small>Upload Time: {upload_time}</small></p>
           <p className='font-semibold'><small>Purchase Date:<span className='mr-2'></span>{purchase_year}</small></p>
           <p className='flex items-center font-medium'><small>{location}</small><FaMapMarkerAlt className='ml-2'/></p>
           <div className="card-actions">
            <button onClick={() => handleReportItem(product)} className='flex items-center btn btn-sm'><span className=' mr-2'>Report to Admin</span><MdReport className='text-2xl'/></button>
            {
              user ?
              <label onClick={() => setProductInfo({image, product_name, resell_price})} htmlFor="booking-modal" className="btn bg-black">Book Now</label>
              :
              <Link className="btn bg-black" to='/login'>Book Now</Link> 
            }
           </div>
          </div>
        </div>
    );
};

export default ProductCard;