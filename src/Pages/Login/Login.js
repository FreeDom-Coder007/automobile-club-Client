import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FcGoogle } from "react-icons/fc"; 
import toast from 'react-hot-toast';
import { useState } from 'react';

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {loginUser, SignInWithGoogle} = useContext(AuthContext)
    const [fireBaseError, setFireBaseError] = useState('')

    // Navigate user
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()

    const handleLogin = (data) => {
        const email = data.email
        const password = data.password

        loginUser(email, password)
        .then(result => {
           const user = result.user
           console.log(user)
           getUserToken(email)
           navigate(from, {replace: true}) 
        })
        .catch(error => {
            console.log(error.message)
            setFireBaseError(error.message)
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
            const image = user.photoURL
            getUserToken(email) 
            postUserToDB(name, email, role, image)
            navigate(from, {replace: true}) 
        })
        .catch(error => console.log(error.message)) 
    }

    const postUserToDB = (name, email, role) => {
        const user = {name, email, role}

        fetch(`https://bike-re-sale-server.vercel.app/users`, {
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
               getUserToken(email) 
               return toast.success(`${role} account created successfully`) 
            } 
        })
    }

    const getUserToken = (email) => {
        fetch(`https://bike-re-sale-server.vercel.app/jwt?email=${email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.accessToken){
               localStorage.setItem('AccessToken', data.accessToken)
               navigate('/') 
            }
        })
    }

    return (
        
        <div className='flex justify-center'>
            <div className='border w-96 px-7 py-6 mt-10 shadow mb-10'>
                <h1 className='text-xl text-center font-semibold'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}> 
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
                    {fireBaseError && <p className='text-medium text-center text-red-500'>{fireBaseError}</p>}
                    <div className='form-control mt-8 mb-4'> 
                      <input type="submit" value="login" className='btn bg-black w-full max-w-xs'/>  
                    </div>
                    <p className='text-center'>Or create a account<Link className='text-success' to='/signup'> SignUp</Link></p>
                    <div className="divider">OR</div>
                </form>
                <div className='form-control'> 
                  <button onClick={handleGoogleSignIn} className='btn bg-black w-full max-w-xs'><FcGoogle className='mr-2 text-2xl'/><span>Google</span></button>  
                </div>
            </div>
        </div>
        
    )
}

export default Login;