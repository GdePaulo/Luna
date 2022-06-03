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
  useEffect(() => {
    // axios.get('/time')
    let url = "/translation"
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
  // The second parameter defines what states this depends on. 
  // This means only initially and not specifying means depend on every state (i.e also setCurrentTime)
  }, [currentText]);

  const handleTextChange = (event) => {
    let text = event.currentTarget.value;
    console.log("New Text:", text);
    
    var regex = /\b(\w+)\b/g;
    var matches = [];
    matches = text.match(regex);

    if (wordCountAtLastCheck.current !== matches.length) {
      console.log("Setting current text..", matches.length, wordCountAtLastCheck.current);
      setCurrentText(text);
      wordCountAtLastCheck.current = matches.length;
    }
  }

  return (
    <div>
      <h3>Luna: Translate</h3>
      <Highlighted handleTextChange={handleTextChange}/>
      <Corrections corrections={corrections}/>
    </div>
  );
}
export default Translate;