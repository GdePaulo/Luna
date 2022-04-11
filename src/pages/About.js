import React from 'react';
import rabbit from "../rabbit.png"

function About() {
  return (
    <div>
      <h3>About</h3>
      <div>
        <img src={rabbit} alt={"rabbit"}/>
      </div>
    </div>
  );
}
export default About;