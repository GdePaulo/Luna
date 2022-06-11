import React from 'react';
import rabbit from "../images/rabbit.png"

function Home() {
  return (
    <div className="main">
      <h3>Home</h3>
      <div>
        <img src={rabbit} alt={"rabbit"}/>
        <img src={rabbit} alt={"rabbit"}/>
      </div>
    </div>
  );
}
export default Home;