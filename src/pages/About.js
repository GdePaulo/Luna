import React from 'react';
import rabbit from "../images/rabbit.png"
import Title from "../components/Title";

function About() {
  return (
    <div>
      <Title title="About"/>
      <div>
        <img src={rabbit} alt={"rabbit"}/>
      </div>
    </div>
  );
}
export default About;