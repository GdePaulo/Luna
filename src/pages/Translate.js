import React, { useEffect, useState} from 'react';
import styles from "../css/tform.module.css";

import axios from 'axios';
import Button from "../components/Button";
import Title from "../components/Title";
import Editor from "../components/Editor";
import Translations from "../components/Translations";
import Spinner from '../components/Spinner';
import Dropdown from "../components/Dropdown";

function Translate(props) {
  const [previousText, setPreviousText] = useState(""); 
  const [currentText, setCurrentText] = useState("");
  const [translations, setTranslations] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fromLanguages = [
    { label: "English", value: "EN"},
    { label: "Dutch", value: "NL"},
    { label: "Papiamentu", value: "PAP"}
  ];
  const toLanguages = { 
    "PAP": 
    [
      { label: "English", value: "EN"},
      { label: "Dutch", value: "NL"}
    ],
    "EN": 
    [
      { label: "Papiamentu", value: "PAP"},
    ],
    "NL": 
    [
      { label: "Papiamentu", value: "PAP"},
    ]
  };
  const [toLanguage, setToLanguage] = useState("NL"); 
  const [fromLanguage, setFromLanguage] = useState("PAP"); 
  const [correctedWord, setCorrectedWord] = useState(""); 

  useEffect(() => {
    document.title = "Luna: Papiamentu Translator"
  }, []);

  const getTranslation = () => {
    setIsLoading(true);
    let url = "/api/translate/word?srclan=" + fromLanguage + "&trgtlan=" + toLanguage;
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
      setTranslations(res.data.translated); 
      setCorrectedWord(res.data.corrected); 

      setIsLoading(false);
    }).catch(error => {
       console.log(error);
       setIsLoading(false);}
      );
  }

  const handleTextChange = (event) => {
    let text = event.currentTarget.value;
    setCurrentText(text);
  }

  const handleTranslateClick = (event) => {
    if (previousText !== currentText) {
      setPreviousText(currentText);
      getTranslation(); 
    }
  }

  const handleFromLanguageChange = (event) => {
    let newFromLanguage = event.target.value;
    setFromLanguage(newFromLanguage);
    let newDefaultToLanguage = toLanguages[newFromLanguage][0].value;
    setToLanguage(newDefaultToLanguage);
  }

  const handleToLanguageChange = (event) => {
    setToLanguage(event.target.value);
  }
    
  return (
    <div className={props.className}>
      <Title title="Luna: Papiamentu Translator (Alpha)">
        This is a free online Papiamentu - Dutch and Papiamentu - English translator. You 
        can use it to translate Papiamentu words to Dutch or to English. It currently only
        translates words. A Papiamentu - Dutch and Papiamentu - English sentence translator is currently under development.
        If you would like to contribute data of Papiamentu - Dutch or Papiamentu - English
        translations of words or sentences, please send a message to contact@lunasoftware.nl.
      </Title>
      <div className={styles.tform__languageSelection}>
        <div className={styles.tform__fromLanguage}>
          <Dropdown
            label="From:"
            options={fromLanguages}
            value={fromLanguage}
            onChange={handleFromLanguageChange}
          />
        </div>
        <div className={styles.tform__tolanguage}>
          <Dropdown
            label="To:"
            options={toLanguages[fromLanguage]}
            value={toLanguage}
            onChange={handleToLanguageChange}
          />
        </div>
      </div>
      <div className={styles.translationCorrection}>
          {correctedWord !== previousText && correctedWord
            ? <span className={styles.translationCorrection__text}>
                Exact text not found. Providing translation for: 
                 <span className={styles.translationCorrection__correction}> {correctedWord}</span>
              </span>
            : null}
      </div>
      <div className={styles.tform}>
        <Editor 
          handleTextChange={handleTextChange}
          currentText={currentText}
          placeholder="Write a word here and press 'Translate' to translate it."/>
        <Translations translations={translations} />
      </div>
      <div className={styles.tform__control}>
        <Button onClick={() => handleTranslateClick()} className= {`${styles.tform__btn}`} disabled={isLoading}>Translate</Button>
        <Spinner isHidden={!isLoading}/>
      </div>
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