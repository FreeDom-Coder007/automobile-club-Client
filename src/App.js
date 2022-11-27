import { RouterProvider } from 'react-router-dom'; 
import router from './routes/router';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; 


function App() {
  return (
      <section className='max-w-sm mx-auto lg:max-w-[1333px] lg:mx-auto'>
        <RouterProvider router={router}/>
        <Toaster/>
        <ToastContainer/> 
      </section>
  )
}

export default App;
