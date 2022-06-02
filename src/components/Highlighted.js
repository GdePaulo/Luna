import React, { useEffect, useState } from 'react';
import CorrectionPopup from "../components/CorrectionPopup";
import $ from "jquery";
import ReactDOMServer from 'react-dom/server';
// import parser from "react-html-parser";

function Highlighted(props) {
    
  const [state, setState] = useState(<p className="highlighted__p"><span className="highlighted__originalText">Here</span></p>);
  const corrections = {
    sure: ["sures", "her"],  
    war: ["born", "car"],  
  }
  const getHighlightedText = (text, highlight) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
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
    event.preventDefault();
    const highlightedHtml = event.currentTarget.innerHTML;
    console.log(highlightedHtml);

    var txt = $(highlightedHtml).find("p").html();
    console.log(txt);
    txt = $(highlightedHtml).find(".highlighted__originalText").text();
    console.log("Text for hgh_or is", txt);

    // const doc = document.getElementsByClassName('highlighted__p')[0].innerText;
    // console.log(doc);
    txt = event.currentTarget.textContent;
    var textWithOptions = txt.split(" ").map(word => {
      console.log("Has own property for", word, "is", corrections.hasOwnProperty(word));
      // word = word.trim();
      if (corrections.hasOwnProperty(word)){
        
      //   return <CorrectionPopup contentEditable="false" className="highlighted__corPopup" typo={word} typoClassName="highlighted__originalText"/>;
      // } else {
        return <span className="highlighted__originalText">{word} </span>;
      } else {
        return word + " ";
      }
    });
    // textWithOptions = event.currentTarget.textContent;this
    let result = <p className="highlighted__p">{textWithOptions}</p>;
    result = textWithOptions;
    console.log("result:", ReactDOMServer.renderToStaticMarkup(result));
    setState(
      result
      // <p className="highlighted__p">Im not sure  <CorrectionPopup className="highlighted__corPopup" typo="sure" /> or what
      // </p>
    );
    
  }

  return (
    // <div  onInput={handleChange} className="highlighted">
    // {
    // getHighlightedText("I Don'T Know but whatever", "But")}
    // </div>
    <div contentEditable onInput={handleChange} className="highlighted">{state}</div>
  );
}
export default Highlighted;