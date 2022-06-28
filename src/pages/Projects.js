import React from 'react';
import rabbit from "../images/rabbit.png";
import arrowfinish from "../images/arrowfinish.png";
import Title from "../components/Title";
import Hero from "../components/Hero";
import s from "../css/projects.module.css";

function Projects() {

  const handleGoToFeedClick = (event) => {
    // feed.current.scrollIntoView({ behavior: "smooth" });
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
    
    <div className={s.project}>
      <div className={s.project__text}>
        <h1 className={s.project__title}>
          {/* {props.title} */}
          Arrow Finish
        </h1>
        <h3 className={s.project__description}>
          {/* {props.description} */}
          testing descriptionglobal 
        </h3>
      </div>
      <div className={s.project__demo}>
        <img src={arrowfinish} alt={"logo"} className={s.project__image} />
      </div>
    </div>
    </div>
  );
}
export default Projects;