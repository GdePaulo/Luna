import React, {useState, useEffect} from 'react';
import styles from "../css/savie.module.css";
import axios from 'axios';
import jingleBell from "../images/christmas-jingle-bells.png";
import santa from "../images/christmas-santa-slay.png";
import { getConditionalclass } from "../components/Utils"

function Savie() {

  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("jingleBells");

  const updateSongStatus = (play) => {
    var PUT_URL = 'https://luna-8a91a-default-rtdb.europe-west1.firebasedatabase.app/status.json';
    // var oldPla:langying = Boolean(playing);
    var put = { currentSong:currentSong, enabled:play};
    axios.put(PUT_URL, put);
  }
  const handlePlaySongClick = (event) => {
    console.log("old playing: ",playing);
    // axios.put(PUT_URL, {"first":"nothing"});z
    var newPlaying = !playing;
    setPlaying(newPlaying);
    console.log("new playing: ", newPlaying);
    updateSongStatus(newPlaying);
  };
  
  useEffect(() => {
    updateSongStatus(playing);
  }, []); 

  return (
    <div className={styles.bkg}>
      <div className={styles["svi-container"]}>
        {/* <h3 className={styles["svi-text"]}>HAPPY BIRTHDAY SAVIE!</h3> */}
        <h3 className={styles["svi-christmas-text"]}>MERRY CHRISTMAS SAVIE!</h3>
        {/* <img src={rabbit} alt={"rabbit"}/> */}
        {/* <button className={styles["svi-button"]} type="submit" onClick={updateSongStatus}> <b> {playing ? "Play" : "Stop"} </b> </button> */}
        <button className= {getConditionalclass(styles["svi-christmas-button"], styles.active, playing)} type="submit" onClick={handlePlaySongClick}> <img src={jingleBell} className={styles.bellIcon}></img></button>
        <img src={santa} className={styles.santaIcon}/>
      </div>
    </div>
  );
}
export default Savie;