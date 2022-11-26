import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FaMapMarkerAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductBookingModal = ({productInfo, setProductInfo}) => {
    const {name, resell_price} = productInfo
    const {user} = useContext(AuthContext)

    const [locations, setLocations] = useState([])
    useEffect(() => {
        fetch('/locations.json')
        .then(res => res.json())
        .then(data => setLocations(data))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const productName = form.productName.value
        const resellPrice = form.resellPrice.value
        const phoneNumber = form.phone.value
        const location = form.location.value

        const bookingData = {name, email, productName, resellPrice, phoneNumber, location}
        console.log(bookingData)
        setProductInfo(null)
        toast.success('item is booked') 
     }

    return ( 
        <div> 
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
          <div className="modal">
           <div className="modal-box relative">
            <label htmlFor="booking-modal" className="btn btn-sm btn-circle bg-black absolute right-2 top-2">✕</label>
            <h3 className="text-lg text-center font-bold">Book Now</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-control my-3'>
                    <label className='font-medium mb-1'>Name</label>
                    <input name='name' value={user?.displayName} disabled type="text" className='input input-bordered w-full'/> 
                </div>
                <div className='form-control my-3'>
                    <label className='font-medium'>Email</label> 
                    <input name='email' value={user?.email} disabled type="email" className='input input-bordered w-full'/> 
                </div>
                <div className='form-control my-3'>
                    <label className='font-medium'>Item Name</label> 
                    <input name='productName' value={name} disabled type="text" className='input font-medium input-bordered w-full'/>
                </div> 
                <div className='form-control my-3'>
                    <label className='font-medium'>ReSell Price</label>
                    <input name='resellPrice' value={`$ ${resell_price}`} disabled type="text" className='input font-medium input-bordered w-full'/>
                </div> 
                <div className='form-control my-3'>
                    <label className='font-medium'>Phone Number</label> 
                    <input name='phone' type="text" className='input input-bordered w-full' required/>
                </div> 
                <div className='form-control my-3'>
                    <label className='font-medium flex items-center mb-1'><span className='mr-2'>Location</span> <FaMapMarkerAlt/></label>   
                    <select name='location' className="select select-bordered w-full" required>
                      <option selected disabled defaultValue="Select your location">Select your location</option>
                      {
                        locations.map(location => <option key={location} value={location}>{location}</option> )
                      }
                    </select>
                </div> 
                <div className='form-control mt-5 mb-4'> 
                  <input type="submit" value="submit" className='btn bg-black'/>  
                </div>
            </form>
           </div>
          </div>
        </div>
    );

};

export default ProductBookingModal;