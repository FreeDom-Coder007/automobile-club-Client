import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthProvider';


const Dashboard = () => {
    const {user} = useContext(AuthContext)
    const email = user.email

    const [appUser, setAppUser] = useState({})
    useEffect(() => {
        fetch(`https://bike-re-sale-server.vercel.app/users/${email}`)
        .then(res => res.json())
        .then(data => setAppUser(data))
    }, [email])  

    return (   
    <div className='flex justify-center'>
        <div className='border text-center w-96 px-7 py-6 mt-6 shadow mb-10'>
            <div className="avatar online">
             <div className="w-24 rounded-full ring ring-offset-base-100 ring-offset-2">
                <img src={appUser?.image} alt=''/>
              </div>
            </div>
            <h1 className='text-xl text-center font-semibold'>Welcome!</h1>
            <h1 className='text-2xl text-center font-semibold my-4'>{user?.displayName}</h1>
            <h1 className='text-xl text-center font-semibold'>To became our {appUser?.role}</h1>
        </div>
    </div>  
    )

}

export default Dashboard;