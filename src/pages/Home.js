import React from 'react';
import { Link } from "react-router-dom";
import rabbit from "../images/rabbit.png"

function Home() {
  return (
    <div className="main">
      <h1 className="luna-description luna-description__title">Luna Home</h1>
      <h3 className="luna-description luna-description__explanation">The Luna Papiamentu spellchecker can be found by clicking this <Link to="/spellcheck">link.</Link></h3>
      <div>
        <img src={rabbit} alt={"rabbit"}/>
        <img src={rabbit} alt={"rabbit"}/>
      </div>
    </div>
  );
}
export default Home;

// Have Header content and footer structure for all pages