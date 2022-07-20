import React, { useEffect, useState } from 'react';
import s from "../css/button.module.css";

function Button(props) {

  const getConditionalclass = (cls, conditionalclass, condition) => {
    return cls + " " + (condition ? conditionalclass : "")
  }
  
  const getButtonClass = () => {
    return getConditionalclass(props.className, s[props.styleType], props.styleType);
  }
  

    
    return (
        <button {...props} className={getButtonClass()}>
      {props.children}
    </button>
    );
}
export default Button;