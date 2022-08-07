import React, { useEffect, useState } from 'react';

import axios from 'axios';

import s from "../css/market.module.css";
import cartIcon from "../images/cart.png";

import Title from "../components/Title";
import Button from "../components/Button";
import Products from "../components/Products";


function Market(props) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  let cartSize = Object.values(cart).reduce((total, current) => total + current.quantity, 0);

  const getProducts = () => {
    let url = "/api/market/list";

    axios({
      method: "GET",
      url: url,
    }).then(res => { 
      console.log("Response:", res.data); 
      setProducts(res.data); 
    }).catch(error => {
      console.log(error);
    });
  }
  
  const handleAddToCartClick = (product) => {
    // Don't assign to original copy to use state update functions
    let newCart = { ...cart };
    if (newCart.hasOwnProperty(product.id)) {  
      newCart[product.id].quantity += 1;
    } else {
      newCart[product.id] = product;
      newCart[product.id].quantity = 1;
    }
    setCart(newCart);
  }

  useEffect(() => {
    document.title = "Luna Market"

    getProducts();

    const storedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(storedCart);
  }, []);
  
  useEffect(() => {
    let fake = {}
    localStorage.setItem("cart", JSON.stringify(cart));
    // localStorage.setItem("cart", JSON.stringify(fake));
    console.log("Updating storage to", cart);
  }, [cart]);

  return (
    <div className={props.className}>
      <Title title="Luna: Market">
        This is a market where you can buy planets. The logistics related to the actual delivery of the planets after purchase are still being figured out. No refunds!
      </Title>
      <Products products={products} onAddToCartClick={handleAddToCartClick} />
      <div className={s.market__actions}>
        <div className={s.market__goToCartContainer}>
          <span className={s.market__goToCartCartSize}>{cartSize}</span>
          <Button className={s.market__goToCart} styleType="button-default" to="/checkout">Go to cart <img src={cartIcon} alt={"cart icon"} className={s.market__goToCartIcon}/></Button>
        </div>
      </div>
    </div>
  );
}
export default Market;

/*
Make sure to not defer the PayPal script or it won't be available and access using window.
JDK configuration: https://developer.paypal.com/sdk/js/configuration/
Account portal: https://www.sandbox.paypal.com/nl/business
Account creation: https://developer.paypal.com/developer/accounts
--More info: https://developer.paypal.com/tools/sandbox/accounts/
My app & credentials: business account API ID and secrets

*/