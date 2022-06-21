import React from 'react';
import { Link } from "react-router-dom";
import s from "../css/home.module.css";


import Title from "../components/Title";

function Home() {
  return (
    <div className="main">
      <Title title="Luna Home">
        This website contains a collection of functionalities which I thought were interesting, fun to implement and/or useful.
        It will be continuously updated. 
        <br /><br />
        The Luna Papiamentu spellchecker can be found by clicking this <Link to="/spellcheck">link.</Link>
      </Title>
      <div className={s.feed__container}>
        <div className={s.feed}>
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