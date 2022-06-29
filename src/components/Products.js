import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import s from "../css/products.module.css";
import axios from 'axios';

import Title from "./Title";
import Button from "./Button";
import Spinner from './Spinner';
import moon from "../images/moon.svg"

function Products(props) {

  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {/*<div className={styles[""]}>
        {<Button onClick={() => getCorrections(false)} className= {`${styles.tform__btn} ${styles["tform__btn--correct"]}`} disabled={isLoading}>Correct</Button>}
        whatever
  </div>*/}
      <div className={s.products__container}>
        <ol className={s.products}>
        {
          props.products.map(x => (
            <li className={s.products__item}>
              <div className={s.products__itemTitle}> {x.title} </div>
              <div className={s.products__itemImg}> 
                <img src={x.img} className={s.products__itemImgIcon} /> 
              </div>
              <div className={s.products__itemDescription}> {x.text} </div>
              <Button onClick={() => props.onAddToCartClick(x)}>Add to cart</Button>
            </li>
          ))
        }
        </ol>
      </div>
    </div>
  );
}
export default Products;

/*
Make sure to not defer the PayPal script or it won't be available and access using window.
JDK configuration: https://developer.paypal.com/sdk/js/configuration/
Account portal: https://www.sandbox.paypal.com/nl/business
Account creation: https://developer.paypal.com/developer/accounts
--More info: https://developer.paypal.com/tools/sandbox/accounts/
My app & credentials: business account API ID and secrets

*/