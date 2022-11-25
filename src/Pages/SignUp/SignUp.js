import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate  } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';


const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {createUser, SignInWithGoogle} = useContext(AuthContext)
    const [firebaseError, setFirebaseError] = useState('')
    const navigate = useNavigate() 

    const handleSignUp = (data) => {
        const email = data.email
        const password = data.password 
        setFirebaseError('')

        createUser(email, password)
        .then(result => {
            const user = result.user
            console.log(user)
            navigate('/') 
        })
        .catch(error => {
            setFirebaseError(error.message)
            console.log(error.message)
        })
    }
    
    const handleGoogleSignIn = () => {
        SignInWithGoogle()
        .then(result => {
            const user = result.user
            console.log(user) 
        })
        .catch(error => {
            setFirebaseError(error.message)
            console.log(error.message)
        })   
    }

    const postUserToDB = () => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(data => console.log(data))
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
                     <label className='label'><span className='label-text font-semibold'>You Account type</span></label>   
                     <select className="select select-bordered w-full max-w-xs">
                      <option disabled selected>Select an Option</option>
                      <option>Seller</option>
                      <option>Buyer</option>
                     </select>
                    </div>
                    {firebaseError && <p className='text-red-500 text-lg text-center'>{firebaseError}</p>}
                    <div className='form-control mt-8 mb-4'> 
                      <input type="submit" value="sign up" className='btn bg-black w-full max-w-xs'/>  
                    </div>
                    <p className='text-center'>Alredy Have an account? <Link className='text-success' to='/login'>Login</Link></p>
                    <div className="divider">OR</div>
                </form>
                <div> 
                <button onClick={handleGoogleSignIn} className='btn bg-black w-full max-w-xs'>Google</button>  
                </div>
            </div>
        </div>
        
    )
}

export default SignUp;