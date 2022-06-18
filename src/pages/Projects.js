import React from 'react';
import rabbit from "../images/rabbit.png"
import Title from "../components/Title";

function Projects() {
  return (
    // <div className="bkg--projects">
    <div>
      <div className="landing">
        <Title title="Projects">
        This page contains a list of projects which I have done. These range from personal hobby projects to more professional projects.
        </Title>

      </div>
      <div>
        {/* <img src={rabbit} alt={"rabbit"}/> */}
        {/* <img src={rabbit} alt={"rabbit"}/> */}
      </div>
    </div>
  );
}
export default Projects;