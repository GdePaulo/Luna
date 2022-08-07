import React, { useEffect, useState } from 'react';

import axios from 'axios';

import s from "../css/checkout.module.css";
import cartIcon from "../images/cart.png";

import Title from "../components/Title";
import Button from "../components/Button";
import Cart from "../components/Cart";
import Payment from "../components/Payment";
import Products from "../components/Products";

function Checkout(props) {
  const [cart, setCart] = useState([]);

  let total = Object.values(cart).reduce((total, current) => total + current.cost * current.quantity, 0);

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
      <div className={s.checkoutArea}>
        <Cart cart={cart} total={total}/>
        <Payment total={total}/>
      </div>
    </div>
  );
}
export default Checkout;