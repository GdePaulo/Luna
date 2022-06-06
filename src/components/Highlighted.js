import React, { useEffect, useState } from 'react';
import CorrectionPopup from "./CorrectionPopup";
import $ from "jquery";
import ReactDOMServer from 'react-dom/server';
// import parser from "react-html-parser";

function Highlighted(props) {
    
  const [state, setState] = useState(<p className="highlighted__p"><span className="highlighted__originalText">Here</span></p>);
  // const getHighlightedText = (text, highlight) => {
  //   // Split text on highlight term, include term itself into parts, ignore case
  //   const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  //   return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
  // } 
  const highlightText = (text, highlight) => {
    // var regex = new RegExp("\b(" + highlight + ")\b", "gi");
    // text = "a test sentence";
    // HAVE TO USE TWO BACKSLASHES INSTEAD OF ONE WHEN USING THE CONSTRUCTOR!!!!!!!!!
    var regex = new RegExp("\\b(" + highlight + ")\\b", "i");
    // console.log(regex.test("a etest sentence"));
    var mat2 = text.match(regex);
    console.log("Mat2", mat2);
    var matches = text.match(/\btest\b/i);
    console.log("matches:",matches);

    const highlightedText = text.replace(regex, function replace(match) { 
      console.log("match is ", match);
    // return "<span className=\"highlighted__originalText\">" + match + "</span>"; 
      return "<span>" + match + "</span>"; 
    });
    console.log("The text new is:", highlightedText);
    return highlightedText;
  }

  const getHighlightedText = () => {
    let finalText = props.currentText;
    for(var key in props.corrections) {
      finalText = highlightText(finalText, key);
    }
    return finalText;
  }

  const test = "what im sure hes not born war anytime soon";
  //https://stackoverflow.com/questions/23835277/updating-content-in-contenteditable-container-with-react
  //maybe don't have it as a child
  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    // setState(event.currentTarget.textContent);

    // const textWithoutOptions = 
    // console.log(event.currentTarget.props.children);
    const highlightedHtml = event.currentTarget.innerHTML;
    console.log(highlightedHtml);

    var txt = "";
    // var txt = $(highlightedHtml).find("p").html();
    // console.log(txt);
    // txt = $(highlightedHtml).find(".highlighted__originalText").text();
    // console.log("Text for hgh_or is", txt);

    // const doc = document.getElementsByClassName('highlighted__p')[0].innerText;
    // console.log(doc);
    // txt = event.currentTarget.textContent;
    // txt = event.currentTarget.textContent;
    var textWithOptions = txt.split(" ").map(word => {
      console.log("Has own property for", word, "is", props.corrections.hasOwnProperty(word));
      // word = word.trim();
      if (props.corrections.hasOwnProperty(word)){
        
      //   return <CorrectionPopup contentEditable="false" className="highlighted__corPopup" typo={word} typoClassName="highlighted__originalText"/>;
      // } else {
        return <span className="highlighted__originalText">{word} </span>;
      } else {
        return word + " ";
      }
    });
    // textWithOptions = event.currentTarget.textContent;this
    textWithOptions = event.currentTarget.value;
    let result = <p className="highlighted__p">{textWithOptions}</p>;
    result = textWithOptions;
    console.log("result:", ReactDOMServer.renderToStaticMarkup(result));
    setState(result);
    props.handleTextChange(event);
  }

  return (
    <div className="tform__highlighted" dangerouslySetInnerHTML={{
            __html: getHighlightedText()
            // __html: getHighlightedText(props.currentText, "test")
        }} />
      
    // <textarea onChange={handleChange} className="tform__txtarea"/>
  );
}
export default Highlighted;