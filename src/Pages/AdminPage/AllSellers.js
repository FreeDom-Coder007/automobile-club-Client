import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSellers = () => {

    const {data: allSellers = [], refetch} = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:4000/allSellers',{
               authorization: `bearer ${localStorage.getItem('AccessToken')}`,
            })
            const data = await res.json()
            return data;
        }
    }) 

    const handleDeleteUser = (id) => {
        console.log(id)
        fetch(`http://localhost:4000/users/${id}`,{
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
         <h1 className='text-4xl font-semibold mb-6'>All Sellers</h1>   
         <table className="table w-full"> 
          <thead>
           <tr>
            <th></th>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
           </tr>
          </thead>
          <tbody> 
           {
             allSellers.map((seller, i) => 
             <tr key={seller._id}>
                <td>{1+i}</td>
                <td>
                 <div className="avatar">
                   <div className="w-14 rounded-full">
                     <img src={seller?.image} alt=''/>
                   </div>
                  </div>
                </td>
                <td>{seller.name}</td>
                <td>{seller.role}</td>
                <td>{seller.email}</td>
                <td><button onClick={() => handleDeleteUser(seller._id)} className='btn btn-sm bg-black'>Delete</button></td>
             </tr>)
           }
          </tbody>
         </table>
        </div>
    )

}

export default AllSellers;