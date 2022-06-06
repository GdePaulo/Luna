import React, { useEffect, useState } from 'react';

function Highlighted(props) {
    
  const highlightText = (text, highlight) => {
    // HAVE TO USE TWO BACKSLASHES INSTEAD OF ONE WHEN USING THE CONSTRUCTOR!!!!!!!!!
    var regex = new RegExp("\\b(" + highlight + ")\\b", "gi");
    const highlightedText = text.replace(regex, function replace(match) { 
      return "<span>" + match + "</span>"; 
    });
    return highlightedText;
  }

  const getHighlightedText = () => {
    let finalText = props.currentText;
    for(var key in props.corrections) {
      finalText = highlightText(finalText, key);
    }
    return finalText;
  }

  return (
    <div className="tform__highlighted" dangerouslySetInnerHTML={{
            __html: getHighlightedText()
            }} />
  );
}
export default Highlighted;