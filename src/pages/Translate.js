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
  const [currentText, setCurrentText] = useState("a test sentence sure is a war");
  const [corrections, setCorrections] = useState(
    {
      sure: ["sures", "her"],  
      war: ["born", "car"],  
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
      <h3 className="luna-translate">Luna: Translate</h3>
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
-Add accent dictionary to make search variant which ignores accents
Add highlighting of misspelled words [x]
Combine dictionaries of curacaon papiamentu
Scrape nws for more data
Add clicking of correction to replace or ignore
Add fix all errors button
Add box for people to evaluate and add corrections
Add color coding of corrections according to closeness
Filter bee to only word and no signs
Make order of words match [x]
After having more sophisticated checks, check for sentences too
Add scrollbar for corrections box [x]
Add automatic scrolling to active correction in box [xthis]
Deal with periods and commas and other punctuation in pattern matching

Add separate css files per page
*/