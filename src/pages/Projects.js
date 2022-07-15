import React, { useEffect, useState } from 'react';
import gitlogo from "../images/GitHub-Mark-64px.png";
import luna from "../images/luna-text.png";
import lunatext from "../images/luna-top-logo.png";
import lunatextbig from "../images/luna-top-logo-text.png";
import jukebox from "../images/jukebox.jpg";
import arrowfinish from "../images/arrowfinish.png";
import spellcheck from "../images/spellchecker.png";
import cityscope from "../images/cityScope-demo.gif";
import cityscopestatic from "../images/cityScope-static.png";
import smartcampus from "../images/smartCampus-demo.gif";
import smartcampusstatic from "../images/smart-campus-model.jpg";
// import smartcampusstatic from "../images/smartCampus-static.png";
import Title from "../components/Title";
import Hero from "../components/Hero";
import s from "../css/projects.module.css";

function Projects() {

  const feedElements = [
    {
      title: "Luna Software",
      description: `
      A website for my personal company, Luna Software. It serves as a personal page to showcase my projects, experience, and software solutions.
      The frontend is created using ReactJS, CSS and HTML and it is hosted using Google Firebase.
      `,
      demo: {
        static: lunatextbig,
      },
      stretched: false
    },
    {
      title: "Arrow Finish",
      description: `
      A half-year long online multiplayer first-person shooter project created using Unity3D. All of the code was written in C#.
      I was able to independently learn and develop my skills with 3D modelling, rigging, skinning, creating textures, animations
      and, of course, writing code for the game logic. As a result, I greatly improved my skills with Unity3D, Photoshop, 3ds Max and C#
      `,
      demo: {
        static: arrowfinish,
      },
      stretched: true
    },
    {
      title: "CityScope",
      description: `An MIT open source project which I have helped set up for my team. This project had a Python backend and ReactJS front-end which uses DeckGL for visualization.`,
      demo: {
        static: cityscopestatic,
        dynamic: cityscope
      },
      stretched: true
    },
    {
      title: "Smart Campus",
      description: `Working with the Real Estate and Facilities team at Erasmus University Rotterdam as part of its smart campus project.
      Responsible for building the pipeline for data assimilation, processing, analysis using Python and visualization using ReactJS.`,
      demo: {
        static: smartcampusstatic,
        dynamic: smartcampus
      },
      stretched: true
    },
    {
      title: "Luna Spellchecker",
      description: `A spellchecker program built as there was no other one available for the language Papiamentu. It uses a ReactJS frontend, a backend written in Python using Flask,
      and Google cloud to build, host and serve a serverless container containing the backend.`,
      demo: {
        static: spellcheck,
      },
      stretched: true
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
      <div
        className={s.project__demo} 
        onMouseEnter={() => handleDemoMouseEnter(index)} 
        onMouseLeave={() => handleDemoMouseLeave(index)}>
        <img 
          src={activeId === index && x.demo.hasOwnProperty("dynamic") ? x.demo.dynamic : x.demo.static}
          alt={"logo"} 
          className={x.stretched ? `${s.project__image} ${s["project__image-stretched"]}` : s.project__image} />
      </div>
    )
  }
  return (
    // <div className="bkg--projects">
    <div>
      <Hero handleGoToFeedClick={handleGoToFeedClick}
        title="Projects"
        command="Go to projects">
          This page contains a list of projects which I have done. These range from personal hobby projects to more professional projects.
          The GitHub page for Luna Software can be found below.
          <br/> <br/> 
          <a href='https://github.com/GdePaulo/Luna' target="_blank"> 
            <img src={gitlogo} className={s.project__gitLogo}/>
          </a>
      </Hero>
      <div className="landing">
        {/* <Title title="Projects">
        This page contains a list of projects which I have done. These range from personal hobby projects to more professional projects.
        </Title> */}
      </div>
      {
        feedElements.map((x, index) => (
          <div key={index} className={s.project} ref={index === 0 ? project : null}>
            {(index % 2 === 1 ? demoSection(x, index) : textSection(x))}
            {(index % 2 === 1 ? textSection(x) : demoSection(x, index))}
          </div>
        ))
      }
    </div>
  );
}
export default Projects;