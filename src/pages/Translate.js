import React, { useEffect, useState} from 'react';
import styles from "../css/tform.module.css";

import axios from 'axios';
import Button from "../components/Button";
import Title from "../components/Title";
import Editor from "../components/Editor";
import Translations from "../components/Translations";
import Spinner from '../components/Spinner';

function Translate(props) {
  const [previousText, setPreviousText] = useState(""); 
  const [currentText, setCurrentText] = useState("");
  const [translations, setTranslations] = useState("Example Translation");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Luna Translate"
  }, []);

  const getTranslation = () => {
    setIsLoading(true)
    let url = "/api/translate"
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
      setTranslations(res.data); 
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
      // getCorrections(accent);
    }
  }
    
  return (
    <div className={props.className}>
      <Title title="Luna: Translate (Coming Soon)">
        This is a Papiamentu - Dutch translator which will be coming soon. It is currently under development pending additional data 
        of Papiamentu - Dutch translation material. If you would like to contribute data of Papiamentu - Dutch or Dutch - Papiamentu
        translations of words or sentences, please send a message to contact@lunasoftware.nl.
      </Title>
      <div className={styles.tform}>
        <Editor 
          handleTextChange={handleTextChange}
          currentText={currentText}
          placeholder="Write a word or sentence here and press 'Translate' to translate it."/>
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