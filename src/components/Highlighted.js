import React, { useEffect, useState } from 'react';
import CorrectionPopup from "../components/CorrectionPopup";
import $ from "jquery";
// import parser from "react-html-parser";

function Highlighted(props) {
    
  const [state, setState] = useState(<p className="highlighted__p"><span className="highlighted__originalText">Here</span></p>);
  const corrections = {
    sure: ["sures", "her"],  
    war: ["born", "car"],  
  }
  const test = "what im sure hes not born war anytime soon";

  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    // setState(event.currentTarget.textContent);

    // const textWithoutOptions = 
    // console.log(event.currentTarget.props.children);
    const highlightedHtml = event.currentTarget.innerHTML;
    console.log(highlightedHtml);

    var txt = $(highlightedHtml).find("p").html();
    console.log(txt);
    txt = $(highlightedHtml).find(".highlighted__originalText").text();
    console.log("Text for hgh_or is", txt);

    // const doc = document.getElementsByClassName('highlighted__p')[0].innerText;
    // console.log(doc);

    var textWithOptions = txt.split(" ").map(word => {
      console.log("Has own property for", word, "is", corrections.hasOwnProperty(word))
      if (corrections.hasOwnProperty(word)){
        
        return <CorrectionPopup className="highlighted__corPopup" typo={word} />;
      } else {
        return <span className="highlighted__originalText">{word + " "}</span>;
      }
    });
    // textWithOptions = event.currentTarget.textContent;
    setState(
      <p className="highlighted__p">{textWithOptions}</p>
      // <p className="highlighted__p">Im not sure  <CorrectionPopup className="highlighted__corPopup" typo="sure" /> or what
      // </p>
    );
    
  }

  return (
    <div contentEditable onInput={handleChange} className="highlighted">{state}</div>
  );
}
export default Highlighted;