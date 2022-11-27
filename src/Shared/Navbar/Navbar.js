import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assests/logo/logo.png';
import yamaha from '../../Assests/logo/yamaha-logo.svg';
import honda from '../../Assests/logo/honda-logo.svg';
import ktm from '../../Assests/logo/ktm-logo.svg';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';


const Navbar = () => {
    const {user, logOut} = useContext(AuthContext)

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
           <li tabIndex={0}>
            <Link className="justify-between">
             Categories
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
            </Link>
            <ul className="p-2 bg-base-200">
              <li><Link><img className='w-8' src={yamaha} alt="yamaha"/>Yamaha</Link></li>
              <li><Link><img className='w-8' src={honda} alt="honda" />Honda</Link></li>
              <li><Link><img className='w-8' src={ktm} alt="ktm"/>KTM</Link></li>
            </ul>
           </li> 
           {
             user ? 
             <React.Fragment>
              <li><Link to='/dashboard'>Dashboard</Link></li>
              <button onClick={handleLogOut}><Link>LogOut</Link></button>
             </React.Fragment> 
             :
             <React.Fragment>
              <li><Link>SignUp</Link></li>
              <li><Link>Login</Link></li>
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
          <li tabIndex={0}>
           <Link>Categories<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg></Link>
           <ul className="p-2 bg-base-200">
            <li><Link><img className='w-8' src={yamaha} alt="yamaha"/>Yamaha</Link></li>
            <li><Link><img className='w-8' src={honda} alt="honda" />Honda</Link></li>
            <li><Link><img className='w-8' src={ktm} alt="ktm"/>KTM</Link></li>
           </ul>
          </li> 
          {
             user ? 
             <React.Fragment>
              <li className='mr-2'><Link to='/dashboard'>Dashboard</Link></li>
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
       <label htmlFor="dashboard-drawer" tabIndex={0} className="navbar-end btn btn-ghost lg:hidden">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
       </label> 
      </section>

    )
}

export default Navbar;