import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import s from "../css/button.module.css";
import { getConditionalclass } from "./Utils"

function Button(props) {

  const getButtonClass = () => {
    return getConditionalclass(props.className, s[props.styleType], props.styleType);
  }
    
  return (
    <>
      { props.to
       ? <Link className={s.button__link} to={props.to}><button {...props} className={getButtonClass()}> {props.children} </button></Link>
       : <button {...props} className={getButtonClass()}> {props.children} </button>
      }
    </>
  );
}
export default Button;