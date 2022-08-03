import React, { useEffect, useState } from 'react';

import axios from 'axios';

import s from "../css/market.module.css";
import cartIcon from "../images/cart.png";

import Title from "../components/Title";
import Button from "../components/Button";
import Cart from "../components/Cart";
import Products from "../components/Products";

function Checkout(props) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    document.title = "Luna Market: Checkout"
    
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(storedCart);
  }, []);

  return (
    <div className={props.className}>
      <Title title="Luna: Market Checkout">
        Purchase the planets you have selected.
      </Title>
      <Cart cart={cart}/>
    
    </div>
  );
}
export default Checkout;