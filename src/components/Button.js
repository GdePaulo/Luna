import React, { useEffect, useState } from 'react';
import s from "../css/button.module.css";
import { getConditionalclass } from "./Utils"

function Button(props) {

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