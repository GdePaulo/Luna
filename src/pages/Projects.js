import React from 'react';
import rabbit from "../images/rabbit.png"
import Title from "../components/Title";

function Projects() {
  return (
    <div className="bkg--projects">
      <div className="landing">
        <Title title="Projects">
          Projects which I have done
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