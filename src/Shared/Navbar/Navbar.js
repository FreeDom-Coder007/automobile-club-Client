import React from 'react';
import logo from '../../Assests/logo/logo.png'; 
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider'; 


const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)
    const { pathname } = useLocation(); 
     
    const handleLogOut = () => {
      logOut()
      .then(() => {})
      .catch(error => console.log(error.message))
    }

    return ( 
      <section className="flex items-center w-full">
       <div className="navbar-start">
        <div className='flex items-center'>
         <div className="dropdown">
         <label tabIndex={0} className="btn btn-ghost lg:hidden">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
         </label>
         <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
           <li><Link to='/'>Home</Link></li>
           <li><Link to='/blog'>Blog</Link></li> 
           {
             user ? 
             <React.Fragment>
              <li><Link to='/dashboard'>Dashboard</Link></li>
              <button onClick={handleLogOut}><Link>LogOut</Link></button>
             </React.Fragment> 
             :
             <React.Fragment>
              <li><Link to='/signup'>SignUp</Link></li>
              <li><Link to='/login'>Login</Link></li>
             </React.Fragment>
           }
         </ul>
         </div>   
         <Link to='/'><img className='w-24 h-20' src={logo} alt="helmet"/></Link> 
         <Link to='/'><h1 className="text-xl font-bold lg:text-3xl lg:font-bold">Bike ReSale Club</h1></Link>
        </div> 
       </div>
       <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/blog'>Blog</Link></li> 
          {
             user ? 
             <React.Fragment>
              <li className='mr-2'><Link to='/dashboard'>Dashboard</Link></li>
              <li onClick={handleLogOut}><Link>LogOut</Link></li>
              <li>
               <div className="avatar">
                 <div className="w-12 rounded-full">
                  <img src={user?.photoURL} alt='user' title={user?.displayName}/>
                 </div>
               </div>
              </li>
             </React.Fragment> 
             :
             <React.Fragment>
              <li><Link to='/signup'>SignUp</Link></li>
              <li><Link to='/login'>Login</Link></li>
             </React.Fragment>
          }
        </ul>
       </div>
       { pathname.includes("dashboard") && 
        <label htmlFor="dashboard-drawer" tabIndex={0} className="navbar-end btn btn-ghost lg:hidden">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>   
       }
      </section> 
    )
}

export default Navbar;