import { RouterProvider } from 'react-router-dom'; 
import router from './routes/router';

function App() {
  return (
      <section className='max-w-[1333px] mx-auto'>
        <RouterProvider router={router}/>
      </section>
  )
}

export default App;
