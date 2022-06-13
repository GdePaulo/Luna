import React from 'react';
import { Link } from "react-router-dom";
import Title from "../components/Title";

function Home() {
  return (
    <div className="main">
      <Title title="Luna Home">
        Luna Papiamentu spellchecker can be found by clicking this <Link to="/spellcheck">link.</Link>
      </Title>
      <div>

      </div>
    </div>
  );
}
export default Home;

// Have Header content and footer structure for all pages