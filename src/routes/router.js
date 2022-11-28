import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from '../Pages/Login/Login';
import RouteProtector from "./RouteProtector"; 
import DashboardLayout from "../Layout/DashboardLayout";
import MyOrders from "../Layout/MyOrders";
import Dashboard from "../Layout/Dashboard";
import AddProduct from "../Layout/AddProduct";
import MyProducts from "../Layout/MyProducts";
import AllBuyers from "../Pages/AdminPage/AllBuyers";
import AllSellers from "../Pages/AdminPage/AllSellers";
// import Payment from "../Layout/Payment";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
               path: '/',
               element: <Home/> 
            },
            {
                path: '/category/:id',
                loader: ({params}) => fetch(`http://localhost:4000/category/${params.id}`),
                element: <RouteProtector><Category/></RouteProtector>,
            },  
            {
                path: '/signup',
                element: <SignUp/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <RouteProtector><DashboardLayout/></RouteProtector>,
        children: [
             {
                path: '/dashboard',
                element: <Dashboard/>
             },
             {
                path: '/dashboard/myOrders',
                element: <MyOrders/>
             },
             {
                path: '/dashboard/myProducts',
                element: <MyProducts/>
             },
             {
                path: '/dashboard/addProduct',
                element: <AddProduct/>
             },
             {
                path: '/dashboard/allBuyers',
                element: <AllBuyers/>
             },
             {
                path: '/dashboard/allSellers',
                element: <AllSellers/>
             }
            //  {
            //     path: '/dashboard/payment/:id',
            //     loader: ({params}) => fetch(`http://localhost:4000/bookings/${params.id}`),
            //     element: <Payment/>
            //  }
        ]
    }
])

export default router;