import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const removeFromCart = (product) => {

    const updatedCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(updatedCartItems);
 
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = () => {

    return cartItems.reduce((total, item) => total + item.finalPrice, 0);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((product) => (
              <li key={product._id}>
                <p>{product.name}</p>
                <p>Price: {product.finalPrice}$</p>
                <button onClick={() => removeFromCart(product)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <p>Total Price: {calculateTotalPrice()}$</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
