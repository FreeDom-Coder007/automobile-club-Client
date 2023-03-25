import React, { useEffect, useState } from 'react'; 
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';


const AddProduct = () => {
    const {user} = useContext(AuthContext)
    const date = new Date() 
    const {register, handleSubmit, formState: {errors}} = useForm()
    const categories = ["Yamaha", "Honda", "KTM", "Suzuki"]
    const navigate = useNavigate() 

    const [locations, setLocations] = useState([])
    useEffect(() => {
        fetch('/locations.json')
        .then(res => res.json())
        .then(data => setLocations(data))
    }, []) 
 
    const handleAddProduct = (data) => { 

        const image = data.Photo[0] 
        const formData = new FormData();
        formData.append('image', image) 

        fetch(`https://api.imgbb.com/1/upload?key=55313d2f9a6381719d51e414cdac62c9`, {
            method: 'POST',
            body: formData 
        })
        .then(res => res.json())
        .then(imageData => {
            console.log(imageData) 
            if(imageData.success){

                const product = { 
                    category_name: data.categoryName,
                    image: imageData.data.url,
                    product_name: data.productName,
                    location: data.location,
                    original_price: data.originalPrice,
                    resell_price: data.resellPrice,
                    purchase_year: data.purchaseYear,
                    upload_time: date,
                    seller_name: user?.displayName 
                }

               fetch('https://bike-re-sale-server.vercel.app/products', {
                 method: 'POST',
                 headers: {
                    authorization: `bearer ${localStorage.getItem('AccessToken')}`,
                    'content-type': 'application/json'
                 },
                 body: JSON.stringify(product)
               })
               .then(res => res.json())
               .then(data => {
                  console.log(data)
                  if(data.acknowledged){
                     toast.success('product added')
                     navigate('/dashboard/myProducts')
                  } 
               }) 
            } 
        })

    }
    
    
    return (
        <div className='flex'>
        <div className='border lg:ml-20 w-96 lg:w-2/3 px-7 py-6 mt-6 shadow mb-10 rounded'>
            <h1 className='text-xl text-center font-semibold my-1'>Add your product</h1>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className='form-control'>
                 <label className="label font-medium"><span className="label-text text-xl">Product Name</span></label>
                 <input {...register("productName", {required: 'Please provide product name'})} type="text" className='input input-bordered w-full'/>
                 {errors.name && <p className='text-red-500 font-medium'>{errors.name.message}</p>} 
                </div>
                <div className='form-control'>
                 <label className="label font-medium"><span className="label-text text-xl">Mobile Number</span></label>
                 <input {...register("phone", {required: 'Mobile number is required'})} type="text" className='input input-bordered w-full'/>
                 {errors.phone && <p className='text-red-500 font-medium'>{errors.phone.message}</p>} 
                </div>
                <div className='form-control'>
                 <label className="label font-medium"><span className="label-text text-xl flex items-center">Location<FaMapMarkerAlt className='ml-2'/></span></label> 
                 <select {...register("location", {required: "Location required"})} name='location' className="select select-bordered w-full" required>
                    {
                      locations?.map(location => <option key={location} value={location} selected>{location}</option> )
                    }
                 </select>
                 {errors.location && <p className='text-red-500 font-medium'>{errors.location.message}</p>} 
                </div>
                <div className='form-control'>
                 <label className="label font-medium"><span className="label-text text-xl">Original Price</span></label>
                 <input defaultValue='$' {...register("originalPrice", {required: 'resellPrice is required'})} type="text" className='input input-bordered w-full'/>
                 {errors.resellPrice && <p className='text-red-500 font-medium'>{errors.resellPrice.message}</p>} 
                </div>
                <div className='form-control'>
                 <label className="label font-medium"><span className="label-text text-xl">Resell Price</span></label>
                 <input defaultValue='$' {...register("resellPrice", {required: 'resellPrice is required'})} type="text" className='input input-bordered w-full'/>
                 {errors.resellPrice && <p className='text-red-500 font-medium'>{errors.resellPrice.message}</p>} 
                </div>
                <div className='form-control'>
                 <label className="label font-medium"><span className="label-text text-xl">Purchase Year</span></label>
                 <input {...register("purchaseYear", {required: 'Please provide used duration'})} type="date" className='input input-bordered w-full'/>
                 {errors.useTime && <p className='text-red-500 font-medium'>{errors.useTime.message}</p>} 
                </div>
                <div className='form-control'>
                 <label className="label font-medium"><span className="label-text text-xl">Product Condition?</span></label>    
                 <select {...register("condition", {required: 'condition is required'})} className="select select-bordered w-full"> 
                   <option selected>Exellent</option>
                   <option>Good</option>
                   <option>Fair</option>
                 </select>
                 {errors.condition && <p className='text-red-500 font-medium'>{errors.condition.message}</p>}  
                </div>
                <div className='form-control mt-3 mb-4'>
                 <label className='label font-medium'><span className='label-text text-xl'>Please Select a category</span></label>   
                 <select {...register("categoryName", {required: 'Please Select a category'})} className="select select-bordered w-full">  
                  {
                    categories.map(category => <option key={category} selected>{category}</option>)
                  }
                 </select>
                 {errors.category && <p className='text-red-500 font-medium'>{errors.category.message}</p>} 
                </div>
                <div className='form-control mt-3 mb-6'>
                 <label className="label font-medium"><span className="label-text text-xl">Upload a photo</span></label> 
                 <input {...register("Photo", {required: 'Photo is required'})} type="file" className="file-input file-input-bordered file-input-md w-full" />
                 {errors.Photo && <p className='text-red-500 font-medium'>{errors.Photo.message}</p>} 
                </div> 
                <div className='form-control mb-2'> 
                  <input type="submit" value="Add Product" className='btn w-full'/>  
                </div> 
            </form>
            <div> 
            </div>
        </div>
    </div>
    )

};

export default AddProduct;