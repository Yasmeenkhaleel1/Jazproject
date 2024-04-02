import { Link } from 'react-router-dom'
import './Navbar.css'
import React from 'react'
export default function Navbar() {
  return (
    <div className='home'>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <p> <i class='bx bxs-shopping-bags'></i> J A Z SHOP</p>
    <div className='navbar'>
       <ul>
        <li>
          <Link> <i class='bx bx-home-heart'></i>Home Page</Link>
           </li>
        <li>
          <Link to={"/pages/categories/components/Categories"}>Categories</Link>
           </li>
        <li>
<Link to={"/pages/products/components/Products"}>Products</Link>
        </li>
        <li>
<Link to={"/pages/cart/components/Cart"}><i class='bx bx-cart'></i>cart</Link>
        </li>
       </ul>
       </div>
       <div>
       <p className='auth'>
     <Link to={"/pages/login/components/Login"}> <i class='bx bxs-log-in'></i>Login</Link>
     <Link to={"/pages/register/components/Register"}> <i class='bx bxs-log-out' ></i>Register</Link>
        </p>
        </div>
   
   
    </div>
  )
}
