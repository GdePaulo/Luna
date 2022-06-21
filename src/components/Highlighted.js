import React, { useEffect, useState } from 'react';
import styles from "../css/tform.module.css";

function Highlighted(props) {
    
  const highlightText = (text, highlight, id) => {
    // HAVE TO USE TWO BACKSLASHES INSTEAD OF ONE WHEN USING THE CONSTRUCTOR!!!!!!!!!
    // var regex = new RegExp("\\b(" + highlight + ")\\b", "gi");
    // var regex = new RegExp("\\b(" + highlight + "[^\w\'\’])\\b", "gi");
    // var regex = new RegExp("\\b(" + highlight + ")(?![\w\'-])", "gi");
    var regex = new RegExp("\\b(" + highlight + ")(?!\\w|\\'|\\’|-)", "gi");
    
    const highlightedText = text.replace(regex, function replace(match) { 
      return "<span id=" + id + ">" + match + "</span>"; 
    });
    // \b([^\d\W]+[\'\’-]*[^\d\W\']*)
    return highlightedText;
  }

  const getHighlightedText = () => {
    let finalText = props.currentText;
    
    Object.keys(props.corrections).forEach((key, index) => {
      finalText = highlightText(finalText, key, index);
    });
    return finalText;
  }

  const handleClick = (event) => {
    (event.target.id == "highlighted") ? props.onBackgroundClick() : props.onWordClick(event.target.id);
    console.log("click", event.target.id);
  }

  return (
    <div id="highlighted" className={`${styles.tform__input} ${styles["tform__input--highlighted"]}`} onClick={handleClick} dangerouslySetInnerHTML={{
            __html: getHighlightedText()
            }} />
  );
}
export default Highlighted;