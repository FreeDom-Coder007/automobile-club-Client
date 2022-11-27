import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate  } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FcGoogle  } from "react-icons/fc";
import { FaPhotoVideo } from "react-icons/fa";


const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm() 
    const {createUser, updateUser, SignInWithGoogle} = useContext(AuthContext)
    const [firebaseError, setFirebaseError] = useState('')
    const navigate = useNavigate() 

    const handleSignUp = (data) => { 
        setFirebaseError('')
        postUserToDB(data.name, data.email, data.role)      
        
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)

        fetch(`https://api.imgbb.com/1/upload?key=55313d2f9a6381719d51e414cdac62c9`,{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageFile => {
            console.log(imageFile)
            if(imageFile.success){
               createUser(data.email, data.password)
               .then(result => {
                const user = result.user
                console.log(user)
                const userInfo = {
                    displayName: data.name,
                    photoURL: imageFile.data.url
                }
                updateUser(userInfo)
                .then(() => {})
                .catch(err => console.log(err.message))
                 navigate('/') 
               })
               .catch(error => {
                setFirebaseError(error.message)
                console.log(error.message)
               })    
            }
        })
    }
    

    const handleGoogleSignIn = () => {
        SignInWithGoogle()
        .then(result => {
            const user = result.user
            console.log(user) 
            const name = user.displayName
            const email = user.email
            const role = 'Buyer'
            postUserToDB(name, email, role)
            navigate('/') 
        })
        .catch(error => {
            setFirebaseError(error.message)
            console.log(error.message)
        })   
    }

    const postUserToDB = (name, email, role) => {
        const user = {name, email, role}

        fetch(`http://localhost:4000/users?email=${email}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => { 
            console.log(data)
            if(data.acknowledged){
               toast.success(`${role} Account created successfully`) 
            }
        })
    }

    return (    
        
        <div className='flex justify-center'>
            <div className='border w-96 px-7 py-6 mt-6 shadow mb-10 rounded'>
                <h1 className='text-xl text-center font-semibold'>SignUp</h1>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className='form-control'>
                     <label className="label"><span className="label-text">Name</span></label>
                     <input {...register("name", {required: "Name is required"})} type="text" className='input input-bordered w-full max-w-xs'/>
                     {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className='form-control'>
                     <label className="label"><span className="label-text">Email</span></label>
                     <input {...register("email", {required: "Email is required"})} type="email" className='input input-bordered w-full max-w-xs'/>
                     {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className='form-control'>
                      <label className="label"><span className="label-text">Password</span></label>
                      <input {...register("password", {required: "Password is Required"})} type="password" className='input input-bordered w-full max-w-xs'/>
                      {errors.password && <p className='text-red-500'>{errors.password.message}</p>}  
                    </div>
                    <div className='form-control mt-3 mb-4'>
                     <label className='label'><span className='label-text font-semibold'>Your Account type</span></label>   
                     <select {...register("role", {required: "Select one option"})} className="select select-bordered w-full max-w-xs" required>  
                      <option>Buyer</option>
                      <option>Seller</option>
                     </select>
                     {errors.role && <p className='text-red-500'>{errors.role.message}</p>}
                    </div>
                    <div className='form-control mb-4'> 
                      <label className="label text-white bg-black text-center btn">
                        <input {...register("image")} type="file" className="w-full hidden"/>
                        <p className='mx-auto flex items-center'><FaPhotoVideo className=' mr-2'/>Upload Photo</p>
                      </label>
                      {errors.photo && <p className='text-red-500'>{errors.photo.message}</p>}  
                    </div>
                    {firebaseError && <p className='text-red-500 text-lg text-center'>{firebaseError}</p>}
                    <div className='form-control my-2'> 
                      <input type="submit" value="sign up" className='btn bg-black w-full max-w-xs'/>  
                    </div>
                    <p className='text-center'>Alredy Have an account? <Link className='text-success' to='/login'>Login</Link></p>
                    <div className="divider">OR</div>
                </form>
                <div> 
                <button onClick={handleGoogleSignIn} className='btn bg-black w-full max-w-xs'><FcGoogle className='mr-2 text-2xl'/><span>Google</span></button>  
                </div>
            </div>
        </div>        
    )

}

export default SignUp;