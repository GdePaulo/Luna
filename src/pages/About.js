import React from 'react';
import s from "../css/about.module.css";
import rabbit from "../images/rabbit.png"
import Title from "../components/Title";

function About(props) {
  return (
    <div className={props.className}>
      <Title title="About">
      Luna Software is a software company dedicated to providing solutions to problems within a variety of domains through the use of software technology.
      Additionally, it serves as a testing ground for the learning, development and prototyping of diverse technologies.
        {/* <div className={s.rabbit}>
          <div className={s.rabbit__text}>
            <h2 className={s.rabbit__title}> Rabbit </h2>
            <p className={s.rabbit__description}>This website is dedicated to this rabbit, which was found on the internet.</p>
          </div>
            <img className={s.rabbit__img} src={rabbit} alt={"rabbit"}/>
        </div> */}
      </Title>
      <div>
      </div>
    </div>
  );
}
export default About;