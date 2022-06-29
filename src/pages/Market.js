import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from "../css/tform.module.css";
import axios from 'axios';

import Title from "../components/Title";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Highlighted from "../components/Highlighted";
import Corrections from '../components/Corrections';
import Spinner from '../components/Spinner';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function Market() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Luna Market"
  }, []);

  const getCorrections = (accents) => {
    setIsLoading(true)
    let url;
    if (accents) {
      url = "/api/accentcheck";
    } else {
      url = "/api/spellcheck";
    }
    let clientId = "ASI8L7Riym-a1ieG4EPXapGCn-ynap8y2K2RqsXG7Py-WTFHjpawMTCb15-qD4ya1_IAzXFIv4bGvzav";
    let clientSecret = "EJliOJx5FVhOpxw-gOrImV2_dBPX_Yd_PfWsj0zA4kEm6Z4iSybzvJ4WkLrOdi7vvzRSFerTio1TDsX7";

    url = "https://api.sandbox.paypal.com/v1/oauth2/token";
    axios({
      method: "post",
      url: url,
      data: 'grant_type=client_credentials', // => this is mandatory x-www-form-urlencoded. DO NOT USE json format for this
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',// => needed to handle data parameter
          'Accept-Language': 'en_US',
      },
      auth: {
          username: clientId,
          password: clientSecret
      },
    }).then(res => { 
      console.log("Response:", res.data); 
      // setCorrections(res.data); 
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
    });
  }


  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <div>
      
      <Title title="Luna: Market">
        This is a market where you can buy absolutely nothing.
      </Title>
      <div className={styles.tform}>
        <Button onClick={() => getCorrections(false)} className= {`${styles.tform__btn} ${styles["tform__btn--correct"]}`} disabled={isLoading}>Correct</Button>
        whatever
      </div>
      <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
        />

      
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