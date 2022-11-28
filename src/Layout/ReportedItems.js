import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { MdReport } from "react-icons/md"; 

const ReportedItems = () => {

    const {data: reportedProducts = [], refetch} = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:4000/reported-products',{
               authorization: `bearer ${localStorage.getItem('AccessToken')}`,
            })
            const data = await res.json()
            return data;
        }
    })
 
    const handleDeleteProduct = (name) => { 
        fetch(`http://localhost:4000/reported-products/${name}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
               toast.success('Product deleted') 
            }
        })

        fetch(`http://localhost:4000/reportedProducts/${name}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){ 
               refetch() 
            }
        })
    }

    return (
        <div className="overflow-x-auto h-5/6">
         {  reportedProducts.length ? 
             <React.Fragment>
              <div className='flex items-center'>
                <h1 className='text-4xl font-semibold mt-4 mb-6'>Reported Items</h1>
                <MdReport className='text-4xl ml-2'/> 
              </div>    
              <table className="table w-full border rounded"> 
                <thead>
                 <tr>
                  <th></th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Original Price</th>
                  <th>Selling Price</th> 
                  <th>Action</th>
                 </tr>
                </thead>
                <tbody> 
                {
                  reportedProducts.map((reportedProdcut, i) => <tr key={reportedProdcut._id}>
                    <th>{1+i}</th>
                    <td>
                     <div className="avatar">
                       <div className="w-14 rounded-full">
                          <img src={reportedProdcut.image} alt=''/>
                       </div>
                     </div>
                    </td> 
                    <td>{reportedProdcut.product_name}</td>
                    <td>{reportedProdcut.original_price}</td>
                    <td>{reportedProdcut.resell_price}</td> 
                    <td><button onClick={() => handleDeleteProduct(reportedProdcut.product_name)} className='btn btn-sm bg-black'>Delete</button></td>
                  </tr>)
                }
               </tbody>          
              </table>
             </React.Fragment>
             :
             <h1 className='text-4xl text-center font-semibold mt-4 mb-6'>No Product were reported</h1>
          } 
        </div>
    );
};

export default ReportedItems;