import React, { useEffect, useState } from 'react';

import axios from 'axios';

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
      id: "Neptune",
      text: `What are you going to do with Neptune?`,
      img: "https://i.pinimg.com/originals/e3/b4/fb/e3b4fb705d398c02319400a0796e720b.jpg",
      cost: 5,
    }, {
      id: "Mars",
      text: `It's really hot.`,
      img: "https://scitechdaily.com/images/Journey-to-Mars.jpg",
      cost: 2.5,
    }, {
      id: "Earth",
      text: `Take good care of it.`,
      img: "https://www.deccanherald.com/sites/dh/files/articleimages/2021/08/05/earth-istoc-k3-1016628-1628178750.jpg",
      cost: 2.5,
    }, {
      id: "Luna",
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
  
  const handleTestClick = (event) => {
    // setIsLoading(true)
    
    let testObject = {
      id:"Earth",
      text: `Take good care of it.`,
      img: earth,
      cost: 2.5,
    }

    let url;

    url = "/api/add";
    axios({
      method: "post",
      url: url,
      data: products[3],
      headers: {
        "Content-Type": "application/json",
        "accept": "*/*"
      },
    }).then(res => { 
      console.log("Response:", res.data); 
      // setIsLoading(false);
    }).catch(error => {
      console.log(error);
      // setIsLoading(false);
    });
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
      <Button onClick={handleTestClick}>Test</Button>
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