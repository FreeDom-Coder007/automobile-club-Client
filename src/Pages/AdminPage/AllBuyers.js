import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyers = () => {

    const {data: allBuyers = [], refetch} = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            const res = await fetch('https://bike-re-sale-server.vercel.app/allBuyers',{
               authorization: `bearer ${localStorage.getItem('AccessToken')}`,
            })
            const data = await res.json()
            return data;
        }
    }) 

    const handleDeleteUser = (id) => {
        console.log(id)
        fetch(`https://bike-re-sale-server.vercel.app/users/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
               toast.success('user deleted')
               refetch() 
            }
        })
    }

    return (
        <div className="overflow-x-auto">
         <h1 className='text-4xl font-semibold mb-6'>All Buyers</h1>   
         <table className="table w-full"> 
          <thead>
           <tr>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>email</th>
            <th>Action</th>
           </tr>
          </thead>
          <tbody> 
           {
             allBuyers.map((buyer, i) => 
             <tr key={buyer._id}>
                <td>{1+i}</td>
                <td>
                 <div className="avatar">
                   <div className="w-14 rounded-full">
                     <img src={buyer?.image} alt=''/>
                   </div>
                 </div>
                </td>
                <td>{buyer.name}</td>
                <td>{buyer.role}</td>
                <td>{buyer.email}</td>
                <td><button onClick={() => handleDeleteUser(buyer._id)} className='btn btn-sm bg-black'>Delete</button></td>
              </tr>)
           }
          </tbody>
         </table>
        </div>
    )

}

export default AllBuyers;