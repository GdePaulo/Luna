import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import s from "../css/home.module.css";
import Title from "../components/Title";
import Button from "../components/Button";

import moon from "../images/moon.svg"
import down from "../images/down.png"

function Home() {
  const feed = useRef();

  const handleGoToFeedClick = (event) => {
    feed.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="main">
      {/* <Title title="Luna Home">
        This website contains a collection of functionalities which I thought were interesting, fun to implement and/or useful.
        It will be continuously updated. 
        <br /><br />
        The Luna Papiamentu spellchecker can be found by clicking this <Link to="/spellcheck">link.</Link>
      </Title> */}
      <div className={s.hero}>
        <div className={s.hero__text}>
          <h1 className={s.hero__title}>
            Luna Software
          </h1>
          <h3 className={s.hero__description}>
          This website contains a collection of functionalities which I thought were interesting, fun to implement and/or useful.
          It will be continuously updated. 
          </h3>
          <button className={s.hero__downBtn} onClick={handleGoToFeedClick}>Go to feed <img src={down} alt={"down"} className={s.hero__downIcon}/></button>
        </div>
        <div className={s.hero__logo}>
          <img src={moon} alt={"logo"} className={s.hero__logoIcon}/>
        </div>
      </div>
      <div className={s.feed__container}>
        <div className={s.feed} ref={feed}>
          <div className={s.feed__item}>
            <div className={s.feed__itemHeader}><h2>Luna Spellcheck</h2></div>
            <div className={s.feed__itemBody}>One of the functionalities which I'm currently working on is a Papiamentu-Dutch Translator.
        While I have built a prototype, I currently do not have enough data to further develop it to the appropriate standard.
        In the meantime, I have built and made available a Papiamentu Spellchecker.</div>
          </div>
          <div className={s.feed__item}>
            <div className={s.feed__itemHeader}><h2>Luna Translate</h2></div>
            <div className={s.feed__itemBody}> Once obtaining enough data, this will be made.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

// Have Header content and footer structure for all pages