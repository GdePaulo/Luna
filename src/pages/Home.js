import React from 'react';
import { Link } from "react-router-dom";
import Title from "../components/Title";

function Home() {
  return (
    <div className="main">
      <Title title="Luna Home">
      This website contains a collection of functionalities which I thought were interesting, fun to implement and/or useful.
It will be continuously updated. One of the functionalities which I'm currently working on is a Papiamentu-Dutch Translator.
While I have built a prototype, I currently do not have enough data to further develop it to the appropriate standard.
In the meantime, I have built and made available a Papiamentu Spellchecker. 
        <br/><br/>
        The Luna Papiamentu spellchecker can be found by clicking this <Link to="/spellcheck">link.</Link>
      </Title>
      <div>

      </div>
    </div>
  );
}
export default Home;

// Have Header content and footer structure for all pages