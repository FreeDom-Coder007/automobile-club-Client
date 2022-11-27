import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';


const MyOrders = () => {
    const {user} = useContext(AuthContext)

    const {data: myBookings = []} = useQuery({
        queryKey: ['myBookings', user?.email],
        queryFn: async() => {
            const res = await fetch(`http://localhost:4000/bookings?email=${user?.email}`)
            const data = await res.json()
            return data;
        }
    })   

    return (
        <div className="overflow-x-auto border h-5/6">
         <table className="table w-full"> 
          <thead>
            <tr>
             <th></th>
             <th>Image</th>
             <th>Item Name</th>
             <th>Price</th>
             <th>Action</th>
            </tr>
          </thead>
          <tbody> 
            { myBookings ?
              myBookings?.map((myBook, i) => <tr key={myBook._id}>
                <th>{i+1}</th>
                <td>
                 <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img src={myBook.image} alt={myBook.productName}/>
                  </div>
                 </div>
                </td>
                <td>{myBook.productName}</td>
                <td>{myBook.resellPrice}</td>
                <td><Link className='btn btn-sm bg-black' to={`/dashboard/payment/${myBook._id}`}>Pay</Link></td>
               </tr> )
               :
               <h1>No Items ware added</h1>
            }
          </tbody>
         </table>
        </div>
    )
    
};

export default MyOrders;