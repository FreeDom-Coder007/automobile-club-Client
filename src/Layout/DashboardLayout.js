import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider'; 
import Navbar from '../Shared/Navbar/Navbar';


const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    
    const [appUser, setAppUser] = useState({})
    useEffect(() => {
      fetch(`https://bike-re-sale-server.vercel.app/users/${user?.email}`)
      .then(res => res.json())
      .then(data => setAppUser(data))
    }, [user?.email]) 
    console.log(appUser)

    return (
        <section>
        <Navbar/>      
        <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content"> 
             <Outlet/> 
            </div> 
            <div className="drawer-side">
             <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>             
             <ul className="menu p-4 w-80 bg-base-100 text-base-content"> 
              {   appUser && 
                  appUser?.role === 'admin' ?
                  <React.Fragment>
                  <li><Link to='/dashboard/allBuyers' className='border focus:bg-black focus:text-white font-medium mb-2'>All Buyers</Link></li>
                  <li><Link to='/dashboard/allSellers' className='border focus:bg-black focus:text-white font-medium mb-2'>All Sellers</Link></li>
                  <li><Link to='/dashboard/reportedItems' className='border focus:bg-black focus:text-white font-medium mb-2'>Reported items</Link></li>
                 </React.Fragment>
                 : 
                  appUser?.role === 'Seller' ? 
                 <React.Fragment>
                  <li><Link to='/dashboard/myOrders' className='border font-medium mb-2 focus:bg-black focus:text-white'>My orders</Link></li>
                  <li><Link to='/dashboard/myProducts' className='border font-medium mb-2 focus:bg-black focus:text-white'>My Products</Link></li>
                  <li><Link to='/dashboard/addProduct' className='border font-medium mb-2 focus:bg-black focus:text-white'>Add Product</Link></li> 
                 </React.Fragment>
                 : 
                 <li><Link to='/dashboard/myOrders' className='border focus:bg-black focus:text-white font-medium'>My orders</Link></li>
              }
             </ul> 
            </div>
        </div>
        </section>
       )

}

export default DashboardLayout;