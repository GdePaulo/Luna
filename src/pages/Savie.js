import React, {useState} from 'react';
import rabbit from "../rabbit.png"

import axios from 'axios';

function Savie() {

  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("happyBirthday");

  const playSong = (event) => {
    console.log("late song",playing);
    var PUT_URL = 'https://luna-8a91a-default-rtdb.europe-west1.firebasedatabase.app/status.json';
    // var oldPla:langying = Boolean(playing);
    var newPlaying = !playing;
    setPlaying(newPlaying);
    var put = { currentSong:currentSong, enabled:playing.toString()};
    axios.put(PUT_URL, put);
    // axios.put(PUT_URL, {"first":"nothing"});
    };

  return (
    <div className="bkg">
      <div className="svi-container">
        <h3 className="svi-text">HAPPY BIRTHDAY SAVIE!</h3>
        {/* <img src={rabbit} alt={"rabbit"}/> */}
        <button className="svi-button" type="submit" onClick={playSong}> <b> {playing ? "Play" : "Stop"} </b> </button>
      </div>
    </div>
  );
}
export default Savie;