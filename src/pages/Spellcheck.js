import React, { useEffect, useState, useRef } from 'react';
import styles from "../css/tform.module.css";
import axios from 'axios';

import Title from "../components/Title";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Highlighted from "../components/Highlighted";
import Corrections from '../components/Corrections';
import Spinner from '../components/Spinner';

function Spellcheck() {
  const [previousText, setPreviousText] = useState(""); 
  const [currentText, setCurrentText] = useState("Skibi algu akinan i primi \"koregi\" pa wak e korikshon na man reks i despues repara e palabra nan robes.");
  const [corrections, setCorrections] = useState(
    {
      korikshon : ["korekshon", "Korekshon", "korupshon"],
      // rechts : ["Recht", "rechten", "rechaso"],
      // repara : ["repará", "ripara", "Separá"]
    }
  );
  const [editMode, setEditMode] = useState(true);
  const [activeCorrectionId, setActiveCorrectionId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Luna Spellchecker"
  }, []);

  const getCorrections = (accents) => {
    setIsLoading(true)
    let url;
    if (accents) {
      url = "/api/accentcheck";
    } else {
      url = "/api/spellcheck";
    }
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
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
    });
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
  
    if (previousText !== currentText) {
      setPreviousText(currentText);
      getCorrections();
    }
    setEditMode(false)
  }
  
  const handleAccentClick = (event) => {
    // deal with parentheses and periods
    var regex = /\b(\w+)\b/g;
    var matches = [];
    matches = currentText.match(regex);
  
    if (previousText !== currentText) {
      setPreviousText(currentText);
      getCorrections(true);
    }
    setEditMode(false)
  }

  const handleEditClick = (event) => {
    setEditMode(true)
  }

  const handleCorrectionClick = (corr) => {
    var regex = new RegExp("\\b(" + corr[0] + ")(?!\\w|\\'|\\’|-)", "gi");
    
    const correctedText = currentText.replace(regex, function replace(match) { 
      return corr[1]; 
    });
    if ((Object.keys(corrections).length - 1) === activeCorrectionId  && activeCorrectionId != 0) {
      setActiveCorrectionId(activeCorrectionId - 1);
    }
    delete corrections[corr[0]];
    setCurrentText(correctedText);
  }
  return (
    <div>
      
      <Title title="Luna: Papiamentu Spell Checker (Alpha)">
        This is an online Papiamentu spellchecker program which will provide corrections to your sentences.
         You can use this to check your spelling if you are not completely certain of it. Additionally, you can also use it as an accent checker. 
         Esaki ta un programa online di spèlchèk pa papiamentu.
          Bo por us'é pa koregí i chèk kon bo a spèl bo palabranan. Bo por us'é tambe pa chèk aksènt.
      </Title>
      <div className={styles.tform}>
        {editMode
          ? <Editor handleTextChange={handleTextChange} currentText={currentText}/>
          : <Highlighted corrections={corrections} currentText={currentText} onWordClick={setActiveCorrectionId} onBackgroundClick={() => setEditMode(true)}/>
        }
        <Corrections corrections={corrections} activeCorrectionId={activeCorrectionId} onCorrectionClick={handleCorrectionClick}/>
        
      </div>
      <div className={styles.tform__control}>
        <Button onClick={handleCorrectClick} className= {`${styles.tform__btn} ${styles["tform__btn--correct"]}`} disabled={isLoading}>Correct</Button>
        <Button onClick={handleEditClick} className={`${styles.tform__btn} ${styles["tform__btn--edit"]}`} >Edit</Button>
        <Button onClick={handleAccentClick} className= {`${styles.tform__btn} ${styles["tform__btn--correct"]}`} disabled={isLoading}>Accent</Button>
        <Spinner isHidden={!isLoading}/>
      </div>
    </div>
  );
}
export default Spellcheck;

/*
Optimize word search
-Add accent dictionary to make search variant which ignores accents [x]
-Add common mistakes (nj->ñ)
-Properly take into account different styles of apostrophes [x]
-Make it faster
--https://en.wikipedia.org/wiki/Longest_common_substring_problem
--https://www.quora.com/Do-you-know-any-word-matching-algorithm
--my own trie
-Penalize accents less in cost function
Add highlighting of misspelled words [x]
Combine dictionaries of curacaon papiamentu
Scrape nws for more data [x]
-nbo deal with words in the beginning of sentences to remove superfluous capitalizations
-nbo deal with kas, cas CAS
Scrape more nws for more data
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
Add functionality to take into account frequency to suggest disproportionately high-frequency words
Make page more mobile friendly
Help The Government?


*/