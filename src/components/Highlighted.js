import React, { useEffect, useState } from 'react';

function Highlighted(props) {
    
  const highlightText = (text, highlight, id) => {
    // HAVE TO USE TWO BACKSLASHES INSTEAD OF ONE WHEN USING THE CONSTRUCTOR!!!!!!!!!
    var regex = new RegExp("\\b(" + highlight + ")\\b", "gi");
    const highlightedText = text.replace(regex, function replace(match) { 
      return "<span id=" + id + ">" + match + "</span>"; 
    });
    return highlightedText;
  }

  const getHighlightedText = () => {
    let finalText = props.currentText;
    // for(var key in props.corrections) {
    //   finalText = highlightText(finalText, key);
    // }
    Object.keys(props.corrections).forEach((key, index) => {
      finalText = highlightText(finalText, key, index);
    });
    return finalText;
  }

  const handleClick = (event) => {
    props.onWordClick(event.target.id);
    console.log("click", event.target.id);
  }

  return (
    <div className="tform__input tform__input--highlighted" onClick={handleClick} dangerouslySetInnerHTML={{
            __html: getHighlightedText()
            }} />
  );
}
export default Highlighted;