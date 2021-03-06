import React, { useEffect, useState } from 'react';

import axios from 'axios';

import s from "../css/market.module.css";
import cartIcon from "../images/cart.png";

import Title from "../components/Title";
import Button from "../components/Button";
import Cart from "../components/Cart";
import Products from "../components/Products";

function Market() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isBuying, setIsBuying] = useState(false);


  const handleBuyClick = (event) => {
    setIsBuying(true);
  }
  
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
    setCart([...cart, product]);
  }

  useEffect(() => {
    document.title = "Luna Market"

    getProducts();
  }, []);

  return (
    <div className={s.main}>
      <Title title="Luna: Market">
        This is a market where you can buy planets. The logistics related to the actual delivery of the planets after purchase are still being figured out. No refunds!
      </Title>
      {isBuying
        ? <Cart cart={cart}/>
        : <Products products={products} onAddToCartClick={handleAddToCartClick} />
      }
      <div className={s.market__actions}>
        <Button className={s.market__goToCart} onClick={handleBuyClick} styleType="button-default">Go to cart <img src={cartIcon} alt={"cart icon"} className={s.market__goToCartIcon}/></Button>
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