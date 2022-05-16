import React from 'react';
import rabbit from "../rabbit.png"

import axios from 'axios';

function Savie() {

  const playSong = (event) => {
    console.log("late song")
    var PUT_URL = 'https://luna-8a91a-default-rtdb.europe-west1.firebasedatabase.app/status.json';
    var put = { currentSong:"loveOfMyLiffe", enabled:"false"}
    axios.put(PUT_URL, put);
    // axios.put(PUT_URL, {"first":"nothing"});
    };

  return (
    <div className="bkg">
      <h3>Savie</h3>
      <div>
        {/* <img src={rabbit} alt={"rabbit"}/> */}
        <button type="submit" onClick={playSong} >Submit</button>
      </div>
    </div>
  );
}
export default Savie;