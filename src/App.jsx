import React from 'react'
import Roots from './routes/Roots';
import Products from './pages/products/components/Products';
import Home from './pages/home/components/Home';
import Login from './pages/login/components/Login';
import Register from './pages/register/components/Register';
import Cart from './pages/cart/components/Cart'
import NotFound from './components/NotFound';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from './pages/categories/components/Categories';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,

    children: [{
      path: "/",
      element: <Home />
    },
    {
      path: "/pages/products/components/Products",
      element: <Products />
    },

    {
      path: "/pages/login/components/Login",
      element: <Login/> 
    },
    {
      path: "/pages/register/components/Register",
      element: <Register />
    },
    { 
       path: "/pages/categories/components/Categories",
    element: <Categories />},
    { 
       path: "/pages/cart/components/Cart",
    element: <Cart/>},
    {
      path: "*",
      element: <NotFound />
    }
    ]

  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}
