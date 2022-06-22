import React from 'react';
import rabbit from "../images/rabbit.png"
import Title from "../components/Title";
import Hero from "../components/Hero";

function Projects() {

  const handleGoToFeedClick = (event) => {
    // feed.current.scrollIntoView({ behavior: "smooth" });
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
      <div>
        {/* <img src={rabbit} alt={"rabbit"}/> */}
        {/* <img src={rabbit} alt={"rabbit"}/> */}
      </div>
    </div>
  );
}
export default Projects;