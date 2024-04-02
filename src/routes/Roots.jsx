import React from 'react';
import Navbar from '../components/Navbar';
import Home from '../pages/home/components/Home';
import { Outlet } from 'react-router-dom';
export default function Root() { 
  return (
    <>
      <Navbar /> 
    <Outlet/>
      
    
    </>
  );
}
