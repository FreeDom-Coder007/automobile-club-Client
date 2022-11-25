import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from '../Pages/Login/Login';
import RouteProtector from "./RouteProtector";

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
                loader: ({params}) => fetch(`http://localhost:5000/category/${params.id}`),
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
    }
])

export default router;