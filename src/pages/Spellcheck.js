import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Button from "../components/Button";
import Editor from "../components/Editor";
import Highlighted from "../components/Highlighted";
import Corrections from '../components/Corrections';

function Spellcheck() {
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
    let url = "/api/spellcheck"
    axios({
      method: "post",
      url: url,
      data: currentText,
      headers: {
        "Content-Type": "text",
        "accept": "*/*"
      },
    }).then(res => { 
      console.log("Response:", res.data); 
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
      <h3 className="luna-translate">Luna: Spell Checker (Alpha)</h3>
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
export default Spellcheck;

/*
Optimize word search
-Add accent dictionary to make search variant which ignores accents
-Properly take into account different styles of apostrophes
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
-Deal with abbreviations and acronyms and initials (check for all caps or. Between)
-Add separate check for numbers
-Deal with place names (check for capitalized first letter?)
-Deal with HTML tags that get parsed
-Fix bug where if n is matched, then n' will be matched too [x] 
-Fix bug where if n is matched, then 'n will be matched too 
-Possibly have to take into account words within single quotations
Add separate css files per page
Make a navigation bar height more dynamic
*/