import React from 'react';
import axios from 'axios';

import rabbit from "../rabbit.png"
import sample from "../ramen.jpg"

import Grid from "../components/Grid"
import Button from "../components/Button"

function Ai() {
  return (
    <div>
      <h3>AI</h3>
      
    <Button
     onClick={() => {
       console.log("pressed the button");
       const article = { };
       axios.get('http://localhost:9080/ping')
      //  axios.post('http://localhost:9080/predictions/foodnet -T sample.jpg`', article)
           .then(response => console.log(response.data))
           .catch(error => {
               console.error('There was an error!', error);
           });
   
    }}
    children="Tyrone" />
    </div>
  );
}
export default Ai;