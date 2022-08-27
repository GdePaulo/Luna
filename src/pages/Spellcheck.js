import React, { useEffect, useState } from 'react';
import styles from "../css/tform.module.css";
import axios from 'axios';

import Title from "../components/Title";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Highlighted from "../components/Highlighted";
import Corrections from '../components/Corrections';
import Spinner from '../components/Spinner';

function Spellcheck(props) {
  const [previousText, setPreviousText] = useState(""); 
  const [currentText, setCurrentText] = useState("");
  const [corrections, setCorrections] = useState(
    {
      koregi: ['koregí', 'koregidó', 'koredó'],
      korikshon: ['korekshon', 'konvikshon', 'frikshon'], 
      ignora: ['ignorá', 'iksora', 'Leonora']
    }
  );
  const [editMode, setEditMode] = useState(true);
  const [activeCorrectionId, setActiveCorrectionId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { label: "Papiamentu (Curaçao)", value: "PAP"},
    { label: "Papiamento (Aruba)", value: "PAP(AW)"}
  ];
  const [language, setLanguage] = useState("PAP"); 

  useEffect(() => {
    document.title = "Luna Spellchecker"
  }, []);

  const getCorrections = (accents) => {
    setIsLoading(true)
    let url;
    if (accents) {
      url = "api/spellcheck/accentcheck?lan=" + language;
    } else {
      url = "api/spellcheck/spellcheck?lan=" + language;
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

  const handleCorrectClick = (accent) => {    
    if (previousText !== currentText) {
      setPreviousText(currentText);
      getCorrections(accent);
    }
    setEditMode(false)
  }
  
  const handleEditClick = (event) => {
    setEditMode(!editMode);
  }
  
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }

  const handleCorrectionClick = (corr) => {
    var regex = new RegExp("\\b(" + corr[0] + ")(?!\\w|\\'|\\’|-)", "gi");
    
    const correctedText = currentText.replace(regex, function replace(match) { 
      return corr[1]; 
    });
    if ((Object.keys(corrections).length - 1) === activeCorrectionId  && activeCorrectionId !== 0) {
      setActiveCorrectionId(activeCorrectionId - 1);
    }
    setCorrections(({ [corr[0]]: value, ...corrections }) => corrections);
    setCurrentText(correctedText);
  }

  const handleSourceClick = (word) => {
    if ((Object.keys(corrections).length - 1) === activeCorrectionId  && activeCorrectionId !== 0) {
      setActiveCorrectionId(activeCorrectionId - 1);
    }

    // Delete keys like this to register state change
    setCorrections(({ [word]: value, ...corrections }) => corrections);
  }
  return (
    <div className={props.className}>
      
      <Title title="Luna: Papiamentu Spell Checker (Beta)">
        This is an online Papiamentu or Papiamento spellchecker program which will provide corrections to your sentences.
         You can use this to check your spelling or as an accent checker. 
         Esaki ta un programa online di spèlchèk pa papiamentu of papiamento.
          Bo por us'é pa koregí i chèk kon bo a spèl bo palabranan. Bo por us'é tambe pa chèk aksènt. 
          <em>This only suggests corrections which are formal words for now.</em>
      </Title>
      
      <Dropdown
        label="Language:"
        options={languages}
        value={language}
        onChange={handleLanguageChange}
      />

      <div className={styles.tform}>
        {editMode
          ? <Editor 
            handleTextChange={handleTextChange}
            currentText={currentText}
            placeholder={`Skibi algu akinan i primi "koregi" pa wak e korikshon na banda drechi. Despues di hasi esaki, bo por klek riba un di e korekshonnan pa drecha e foutnan. Bo por klek tambe riba e palabra original pa ignora un korekshon.`}/>
          : <Highlighted corrections={corrections} currentText={currentText} onWordClick={setActiveCorrectionId} onBackgroundClick={() => setEditMode(true)}/>
        }
        <Corrections corrections={corrections} activeCorrectionId={activeCorrectionId} onCorrectionClick={handleCorrectionClick} onSourceClick={handleSourceClick}/>
        
      </div>
      <div className={styles.tform__control}>
        <Button onClick={() => handleCorrectClick(false)} className= {`${styles.tform__btn} ${styles["tform__btn--correct"]}`} disabled={isLoading}>Correct</Button>
        {language === "PAP"
          ? <Button onClick={() => handleCorrectClick(true)} className= {`${styles.tform__btn} ${styles["tform__btn--accent"]}`} disabled={isLoading}>Check accent</Button>
          : null
        }
        <Button onClick={handleEditClick} className={`${styles.tform__btn} ${styles["tform__btn--edit"]}`}>
          {
            editMode ? "view" : "edit"
          }
        </Button>
        <Spinner isHidden={!isLoading}/>
      </div>
    </div>
  );
}

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <div className={styles.languages}>
      <label className={styles.languages__label}>
        {label}
        <select className={styles.languages__dropdown} value={value} onChange={onChange}>
          {options.map((option) => (
            <option className={styles.languages__item} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

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
Fix double correction if same mistake is present in alternating caps
Fix correction not matching capitalization e.g. initial sentence words
Add clicking of correction to replace or ignore [x]
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
Add separate css files per page [x]
Make a navigation bar height more dynamic [x]
Add functionality to take into account frequency to suggest disproportionately high-frequency words
Make page more mobile friendly [x]
Help The Government?
-Deal with contractions (us'e) 'e should have sharp accent if referring to person
-deal with duplicate matches and highlighting
-Remove unnecessary files in docker container
-Prioritize similarity if letter is a variant of an accented version
-Create limits in front and backend eg. max word
-Create simple word lookup and dictionary function
-Placeholder and color
*/