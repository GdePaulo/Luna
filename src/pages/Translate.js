import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Grid from "../components/Grid";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Highlighted from "../components/Highlighted";
import CorrectionPopup from "../components/CorrectionPopup";
import TranslationForm from "../components/TranslationForm";
import Corrections from '../components/Corrections';

function Translate() {
  const [currentText, setCurrentText] = useState("Skibi algu akinan pa wak e korikshon na man rechts i despues repara e palabra nan robes.");
  const [corrections, setCorrections] = useState(
    {
      korikshon : ["korekshon", "Korekshon", "korupshon"],
      rechts : ["Recht", "rechten", "rechaso"],
      repara : ["repará", "ripara", "Separá"]
    }
  );
  const [editMode, setEditMode] = useState(true);
  const [activeCorrectionId, setActiveCorrectionId] = useState(0);
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
    }).then(res => { 
      console.log("Responsethis:", res.data); 
      setCorrections(res.data); 
    })
      .catch(error => console.log(error));
  }

  const handleTextChange = (event) => {
    let text = event.currentTarget.value;
    setCurrentText(text);
  }

  const handleCorrectClick = (event) => {
    // deal with parentheses and periods
    var regex = /\b(\w+)\b/g;
    var matches = [];
    matches = currentText.match(regex);
  
    if (wordCountAtLastCheck.current !== matches.length) {
      console.log("Setting current text..", matches.length, wordCountAtLastCheck.current);
      wordCountAtLastCheck.current = matches.length;
      getCorrections();
    }
    setEditMode(false)
  }
  const handleEditClick = (event) => {
    setEditMode(true)
  }
  return (
    <div>
      <h3 className="luna-translate">Luna: Translate (Coming Soon)</h3>
      <div className="tform">
        {editMode
          ? <Editor handleTextChange={handleTextChange} currentText={currentText}/>
          : <Highlighted corrections={corrections} currentText={currentText} onWordClick={setActiveCorrectionId}/>
        }
        <Corrections corrections={corrections} activeCorrectionId={activeCorrectionId}/>
        
      </div>
      <Button onClick={handleCorrectClick} className="tform__btn tform__btn--correct">Correct</Button>
      <Button onClick={handleEditClick} className="tform__btn tform__btn--edit">Edit</Button>
    </div>
  );
}
export default Translate;

/*
Optimize word search
-Add accent dictionary to make search variant which ignores accents [x]
-Properly take into account different styles of apostrophes

Begin with iterative approach, making sure sentence by sentence is correct properly
begin with just be data. And no sentences
Combine rule-based and automatic translations to use domain knowledge to extract more value from
limited data set.Rules can deal with common patterns (di e -> dje, e)
*/