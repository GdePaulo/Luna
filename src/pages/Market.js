import React, { useEffect, useState } from 'react';

import Title from "../components/Title";
import Button from "../components/Button";
import Cart from "../components/Cart";
import Products from "../components/Products";

import moon from "../images/moon.svg"
import earth from "../images/planets/earth.jpg"
import mars from "../images/planets/mars.jpg"
import neptune from "../images/planets/neptune.jpg"

function Market() {
  const products = [
    {
      title: "Neptune",
      text: `What are you going to do with Neptune?`,
      img: neptune,
      cost: 5,
    }, {
      title: "Mars",
      text: `It's really hot.`,
      img: mars,
      cost: 2.5,
    }, {
      title: "Earth",
      text: `Take good care of it.`,
      img: earth,
      cost: 2.5,
    }, {
      title: "Luna",
      text: `Bonus package to buy my website and the actual moon.`,
      img: moon,
      cost: 2.5,
    }
  ];

  const [cart, setCart] = useState([]);
  const [isBuying, setIsBuying] = useState(false);


  const handleBuyClick = (event) => {
    setIsBuying(true);
  }
  
  const handleAddToCartClick = (product) => {
    setCart([...cart, product]);
  }

  useEffect(() => {
    document.title = "Luna Market"
  }, []);

  return (
    <div>
      <Title title="Luna: Market">
        This is a market where you can buy planets. The logistics related to the actual delivery of the planets after purchase are still being figured out. No refunds!
      </Title>
      {isBuying
        ? <Cart cart={cart}/>
        : <Products products={products} onAddToCartClick={handleAddToCartClick} />
      }
      <Button onClick={handleBuyClick}>Go to cart</Button>
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