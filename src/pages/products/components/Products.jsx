import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

function Products() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); 

  const getProducts = async () => {
    const response = await fetch('https://ecommerce-node4-five.vercel.app/products?page=1&limit=10');
    const data = await response.json();
    setProducts(data.products);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]); 
  };

  useEffect(() => {
    getProducts();
   
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    if (cartItemsFromStorage) {
      setCartItems(JSON.parse(cartItemsFromStorage)); 
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <h2>Products</h2>
      <div className='item'>
        {products.map((product) => (
          <div className='product' key={product._id}>
            <img src={product.mainImage.secure_url} alt={product.name} />
            <p>{product.name}</p>
            <div className="item-price">
              <div className="item-price-new">
                <h5>{product.finalPrice}$</h5>
              </div>
              <div className="item-price-old">
                <h5>{product.price}$</h5>
              </div>
            </div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
