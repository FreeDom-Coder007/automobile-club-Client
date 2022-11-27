import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)

    const [appUser, setAppUser] = useState({})
    useEffect(() => {
        fetch(`http://localhost:4000/users?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setAppUser(data))
    }, [user?.email]) 

    return (   
    <div className='flex justify-center'>
        <div className='border h-4/5 text-center w-96 px-7 py-6 mt-6 shadow mb-10 rounded'>
            <div className="avatar online">
             <div className="w-24 rounded-full ring ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL} alt=''/>
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