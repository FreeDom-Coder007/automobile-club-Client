import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';


const MyOrders = () => {
    const {user} = useContext(AuthContext)

    const {data: myBookings = [], refetch} = useQuery({
        queryKey: ['myBookings', user?.email],
        queryFn: async() => {
            const res = await fetch(`http://localhost:4000/bookings?email=${user?.email}`)
            const data = await res.json()
            return data;
        }
    }) 
    
    const handleDelete = (id) => {
        fetch(`http://localhost:4000/bookings/${id}`, {
           method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
           console.log(data)
           if(data.acknowledged){
              toast.success('remove from your bookings')
              refetch()
           }
        })
    }
    

    return (
        <div className="overflow-x-auto h-5/6">
         { myBookings.length ?
           <React.Fragment>
            <h1 className='text-4xl font-semibold mt-4 mb-6'>My Products</h1>  
            <table className="table w-full border rounded"> 
            <thead>
            <tr>
             <th></th>
             <th>Image</th>
             <th>Item Name</th>
             <th>Price</th>
             <th>Pay</th>
             <th>Delete From list</th>
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
                <td><button onClick={() => handleDelete(myBook._id)} className='btn btn-sm bg-black'>Delete</button></td>
               </tr> )
               :
               <h1>No Items ware added</h1>
            }
            </tbody>
            </table>
           </React.Fragment>
           :
           <h1 className='text-4xl text-center font-semibold mt-4 mb-6'>No Items were booked!</h1> 
         } 
        </div>
    )
    
}

export default MyOrders;