import React from 'react';
import rabbit from "../images/rabbit.png"
import Title from "../components/Title";

function About() {
  return (
    <div>
      <Title title="About">
      Luna Software is a software company dedicated to providing solutions to problems within a variety of domains through the use of software technology.
      Additionally, it serves as a personal testing ground for the learning, development and prototyping of diverse technologies.
      </Title>
      <div>
        <img src={rabbit} alt={"rabbit"}/>
      </div>
    </div>
  );
}
export default About;