import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import s from "../css/market.module.css";
import axios from 'axios';

import Title from "../components/Title";
import Button from "../components/Button";
import Payment from "../components/Payment";
import Products from "../components/Products";
import Spinner from '../components/Spinner';

import moon from "../images/moon.svg"
import earth from "../images/planets/earth.jpg"
import mars from "../images/planets/mars.jpg"
import neptune from "../images/planets/neptune.jpg"
import titan from "../images/planets/titan.jpg"


function Market() {

  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

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
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuying, setIsBuying] = useState(false);


  const handleBuyClick = (event) => {
    setIsBuying(true);
  }
  
  const handleAddToCartClick = (product) => {
    setCart([...cart, product]);
  }

  let total = cart.reduce(function(prev, current) {
    return prev + current.cost;
  }, 0);

  useEffect(() => {
    document.title = "Luna Market"
  }, []);

  return (
    <div>

      <Title title="Luna: Market">
        This is a market where you can buy absolutely nothing.
      </Title>
      <Button onClick={handleBuyClick}>Buy Nothing</Button>
      <ol className={""}>
        {
          cart.map(x => (
            <li className={""}>
              <div className={""}> {x.title} : €{x.cost} </div>
            </li>
          ))
        }
        </ol>
        {
          <div>
            Total: €{total}
          </div>
        }
      {isBuying
        ? <Payment total={total}/>
        : <Products products={products} onAddToCartClick={handleAddToCartClick} />
      }
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