
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Main from './layout/Main';
import Shop from './Components/Shop/Shop'
import Orders from './Components/Orders/Orders';
import Inventory from './Components/Inventory/Inventory';
import { ProdcutsAndCartLoader } from './loaders/ProdcutsAndCartLoaders';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import Shipping from './Components/shipping/Shipping';
import PrivateRoute from './Components/routes/PrivateRoute';
function App() {
  const router = createBrowserRouter ([
    {
      path: "/", 
      element: <Main></Main>, 
      children:  [
        {
          path: '/',
          loader: () => fetch('http://localhost:5000/products'),
          element: <Shop></Shop>
        },
        {
          path: '/shop', 
          loader: async () =>{
            return fetch ('http://localhost:5000/products')
          },
          element: <Shop></Shop>
        },
        {
          path: '/orders', 
          loader: ProdcutsAndCartLoader,
          element: <Orders></Orders>
        }, 
        {
          path: '/inventory', 
          element:<PrivateRoute> <Inventory></Inventory></PrivateRoute>
        }, 
        {
          path: '/shipping', 
          element: <PrivateRoute><Shipping></Shipping></PrivateRoute>
        }, 
        {
          path: '/about', 
          element: <About></About>
        },

        {
          path: '/login',
          element: <Login></Login>
        },{
          path:'/signup',
          element: <Signup></Signup>
        }
      ]
    },
    
  ]) ;
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
