import React, { useEffect, useState, useRef, forwardRef } from 'react';
import s from "../css/hero.module.css";
import down from "../images/down.png"
import moon from "../images/moon.svg"
import star from "../images/star.png"

function Hero(props) {

  const [isLogoActive, setIsLogoActive] = useState(false);

  const handleLogoMouseEnter = (event) => {
    setIsLogoActive(true);
  }

  const handleLogoMouseLeave = (event) => {
    setIsLogoActive(false);
  }

  const getConditionalclass = (cls, conditionalclass, condition) => {
    return cls + " " + (condition ? conditionalclass : "")
  }



  return (
    <div className={s.hero}>
      <div className={s.hero__text}>
        <h1 className={s.hero__title}>
          {props.title}
        </h1>
        <h3 className={s.hero__description}>
          {props.children}
        </h3>
        <button className={s.hero__downBtn} onClick={props.handleGoToFeedClick}>{props.command} <img src={down} alt={"down"} className={s.hero__downIcon} /></button>
      </div>
      <div className={getConditionalclass(s.hero__logo, s.active, isLogoActive)} onMouseEnter={handleLogoMouseEnter} onMouseLeave={handleLogoMouseLeave}>
        <img src={moon} alt={"logo"} className={getConditionalclass(s.hero__logoIcon, s.active, isLogoActive)} />
        <div>
          {[...Array(9).keys()].map(x => (
            <img src={star} alt={"logo"} className={getConditionalclass(s.hero__logoStar, s.active, isLogoActive)} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Hero;

// Add animation to hero logo with it becomes night time on hover