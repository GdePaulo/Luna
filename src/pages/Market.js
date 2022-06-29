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

function Market() {

  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

  const products = [
    {
      title: "Luna Spellcheck",
      text: `This is a terrible product.`,
      img: moon,
      cost: 5,
    }, {
      title: "Luna Translate",
      text: `Once obtaining enough data, this will be made.`,
      img: moon,
      cost: 2.5,
    }, {
      title: "Luna Cool",
      text: `Made a simple implementation ng algorithm in javascript.`,
      img: moon,
      cost: 2.5,
    }, {
      title: "Luna AI",
      text: `Expirementations with PyTorch machine  b inference with TorchServe.`,
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
        ? <Payment />
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