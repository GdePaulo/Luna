import React, { useEffect, useState } from 'react';
import CorrectionPopup from "../components/CorrectionPopup";
import $ from "jquery";
import ReactDOMServer from 'react-dom/server';
// import parser from "react-html-parser";

function Correction(props) {
    
  const [state, setState] = useState(<p className="highlighted__p"><span className="highlighted__originalText">Here</span></p>);
  const corrections = {
    sure: ["sures", "her"],  
    war: ["born", "car"],  
  }
  const getHighlightedText = (text, highlight) => {
    // let 
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
  } 
  const test = "what im sure hes not born war anytime soon";
  return (
    <div className="corrections">
      <ul>
                {
                  Object.keys(corrections).map((key, index) => ( 
                        <li>
                        {key} : {corrections[key]}
                        </li>

                    ))
                }

            </ul>
    </div>
  );
}
export default Correction;