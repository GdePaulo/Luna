import React, { useEffect, useState } from 'react';
import rabbit from "../images/rabbit.png";
import arrowfinish from "../images/arrowfinish.png";
import spellcheck from "../images/spellchecker.png";
import cityscope from "../images/cityScope-demo.gif";
import cityscopestatic from "../images/cityScope-static.png";
import smartcampus from "../images/smartCampus-demo.gif";
import smartcampusstatic from "../images/smartCampus-static.png";
import Title from "../components/Title";
import Hero from "../components/Hero";
import s from "../css/projects.module.css";

function Projects() {

  const feedElements = [
    {
      title: "Arrow Finish",
      description: `A half-year long online ultiplayer first-person shooter project created using Unity3D. All of the code was written in C#.`,
      demo: {
        static: arrowfinish,
      },
      reversed: false
    },
    {
      title: "CityScope",
      description: `An MIT open source project which I have helped set up for my team. This project had a Python backend and ReactJS front-end which uses DeckGL for visualization.`,
      demo: {
        static: cityscopestatic,
        dynamic: cityscope
      },
      reversed: true
    },
    {
      title: "Smart Campus",
      description: `Working with the Real Estate and Facilities team at Erasmus University Rotterdam as part of its smart campus project.
      Responsible for building the pipeline for data assimilation, processing, analysis using Python and visualization using ReactJS.`,
      demo: {
        static: smartcampusstatic,
        dynamic: smartcampus
      },
      reversed: false
    },
    {
      title: "Luna Spellchecker",
      description: `A spellchecker program built as there was no other one available for the language Papiamentu. It uses a ReactJS frontend, a backend written in Python using Flask,
      and Google cloud to build, host and serve a serverless container containing the backend.`,
      demo: {
        static: spellcheck,
      },
      reversed: true
    }
  ];

  const project = React.createRef();
  const [activeId, setActiveId] = useState(-1);

  const handleGoToFeedClick = (event) => {
    project.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleDemoMouseEnter = (id) => {
    setActiveId(id);
  }

  const handleDemoMouseLeave = (id) => {
    setActiveId(-1);
  }
  // jukebox, arrow finish, blocky shorl, cityScope, smart campus, 

  const textSection = (x) => {
    return (
      <div className={s.project__text}>
        <h1 className={s.project__title}>
          {x.title}
        </h1>
        <h3 className={s.project__description}>
          {x.description}
        </h3>
      </div>
    )
  }

  const demoSection = (x, index) => {
    return (
      <div className={s.project__demo} onMouseEnter={() => handleDemoMouseEnter(index)} onMouseLeave={() => handleDemoMouseLeave(index)}>
        <img src={activeId === index && x.demo.hasOwnProperty("dynamic") ? x.demo.dynamic : x.demo.static} alt={"logo"} className={s.project__image} />
      </div>
    )
  }
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
          <div key={index} className={s.project} ref={index === 0 ? project : null}>
            {(x.reversed ? demoSection(x, index) : textSection(x))}
            {(x.reversed ? textSection(x) : demoSection(x, index))}
          </div>
        ))
      }
    </div>
  );
}
export default Projects;