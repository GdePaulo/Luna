import React, { useEffect, useState } from 'react';
import rabbit from "../images/rabbit.png";
import arrowfinish from "../images/arrowfinish.png";
import cityscope from "../images/cityScope-demo.gif";
import cityscopestatic from "../images/cityScope-static.png";
import Title from "../components/Title";
import Hero from "../components/Hero";
import s from "../css/projects.module.css";

function Projects() {

  const feedElements = [
    {
      title: "Arrow Finish",
      description: `e, I have built and made available a Papiamentu Spellchecker which can be found <a href='/spellcheck'>here</a>.`,
      demo: {
        static: arrowfinish,
      }
    }
    ,{
      title: "CityScope",
      description: `One of the functionalities which I'm currently working on is a Papiamentu-Dutch Translator.
      While I have built a prototype, I currently do not have enough `,
      demo: {
        static: cityscopestatic,
        dynamic: cityscope
      }
    }
  ];
  const [activeId, setActiveId] = useState(-1);

  const handleGoToFeedClick = (event) => {
    // feed.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleDemoMouseEnter = (id) => {
    setActiveId(id);
  }
  
  const handleDemoMouseLeave = (id) => {
    setActiveId(-1);
  }
  // jukebox, arrow finish, blocky shorl, cityScope, smart campus, 

  return (
    // <div className="bkg--projects">
    <div>
      <Hero handleGoToFeedClick={handleGoToFeedClick}
        title="Projects"
        description="This page contains a list of projects which I have done. These range from personal hobby projects to more professional projects."
        command="Go to projects"
      />
      <div className="landing">
        {/* <Title title="Projects">
        This page contains a list of projects which I have done. These range from personal hobby projects to more professional projects.
        </Title> */}
      </div>
    { 
      feedElements.map((x, index) => (
        <div key={index} className={s.project}>
          <div className={s.project__text}>
            <h1 className={s.project__title}>
              {x.title}
            </h1>
            <h3 className={s.project__description}>
              {x.description}
            </h3>
          </div>
          <div className={s.project__demo} onMouseEnter={() => handleDemoMouseEnter(index)} onMouseLeave={() => handleDemoMouseLeave(index)}>
            <img src={activeId === index && x.demo.hasOwnProperty("dynamic") ? x.demo.dynamic : x.demo.static} alt={"logo"} className={s.project__image} />
          </div>
        </div>
      ))
    }
    </div>
  );
}
export default Projects;