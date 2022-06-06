import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Grid from "../components/Grid";
import Button from "../components/Button";
import Highlighted from "../components/Highlighted";
import CorrectionPopup from "../components/CorrectionPopup";
import TranslationForm from "../components/TranslationForm";
import Corrections from '../components/Corrections';

function Translate() {
  const [currentText, setCurrentText] = useState("a test sentence");
  const [corrections, setCorrections] = useState(
    {
      sure: ["sures", "her"],  
      war: ["born", "car"],  
    }
  );
  var wordCountAtLastCheck = useRef(null);
  const getCorrections = () => {
    let url = "/api/translation"
    axios({
      method: "post",
      url: url,
      data: currentText,
      headers: {
        "Content-Type": "text",
        "accept": "*/*"
      },
    }).then(res => { console.log("Response:", res.data); setCorrections(res.data); })
      .catch(error => console.log(error));
  }
  useEffect(() => {
    // axios.get('/time')
  // The second parameter defines what states this depends on. 
  // This means only initially and not specifying means depend on every state (i.e also setCurrentTime)
  }, [currentText]);

  const handleTextChange = (event) => {
    let text = event.currentTarget.value;
    console.log("New Text:", text);
    setCurrentText(text);
    
  }

  const handleCorrectClick = (event) => {
    var regex = /\b(\w+)\b/g;
    var matches = [];
    matches = currentText.match(regex);
  
    if (wordCountAtLastCheck.current !== matches.length) {
      console.log("Setting current text..", matches.length, wordCountAtLastCheck.current);
      wordCountAtLastCheck.current = matches.length;
      getCorrections();
    }
  }
  const handleEditClick = (event) => {
  }
  return (
    <div>
      <h3>Luna: Translate</h3>
      <div className="tform">
        <Highlighted handleTextChange={handleTextChange}/>
        <Corrections corrections={corrections}/>
      </div>
      <Button onClick={handleCorrectClick}>Correct</Button>
      <Button onClick={handleEditClick}>Edit</Button>
    </div>
  );
}
export default Translate;