import React, { useEffect, useState, useRef, forwardRef } from 'react';
import s from "../css/hero.module.css";
import down from "../images/down.png"
import moon from "../images/moon.svg"

function Hero(props) {

  return (
    <div className={s.hero}>
      <div className={s.hero__text}>
        <h1 className={s.hero__title}>
          {props.title}
        </h1>
        <h3 className={s.hero__description}>
          {props.description}
        </h3>
        <button className={s.hero__downBtn} onClick={props.handleGoToFeedClick}>{props.command} <img src={down} alt={"down"} className={s.hero__downIcon} /></button>
      </div>
      <div className={s.hero__logo}>
        <img src={moon} alt={"logo"} className={s.hero__logoIcon} />
      </div>
    </div>
  );
}
export default Hero;