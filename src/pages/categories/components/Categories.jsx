import axios from 'axios';
import './Categories.css'
import { Link } from 'react-router-dom'
import React,{useEffect,useState} from 'react'



 function Categories() {
  const [productId, setProductId] = useState(null);

  const[categories,setCategories]=useState([]);
  const [loader,setLoader]=useState(true);
  const [error,setError]=useState('');
  const getcategories=async()=>{
   
    const response =await fetch('https://ecommerce-node4-five.vercel.app/categories/active?page=1&limit=10');
    const data=await response.json();
    setCategories(data.categories);
  
    }
  useEffect(()=>{
   getcategories();

  },[])
  return (
    <>
       <h2>categories </h2>
       <div className='row'>
       {categories.map((category)=>
        <div className='category' key={category._id}>
         
          <Link to={""}>
  <img src={category.image.secure_url} />
</Link>

          
        </div>)}
        </div>
       </>


  )
}

export default Categories