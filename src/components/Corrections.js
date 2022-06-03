import React, { useEffect, useState } from 'react';
import CorrectionPopup from "../components/CorrectionPopup";
import $ from "jquery";
import ReactDOMServer from 'react-dom/server';
// import parser from "react-html-parser";

function Correction(props) {
  return (
    <div className="tform__corrections">
      <ul>
                {
                  Object.keys(props.corrections).map((key, index) => ( 
                        <li>
                        {key} : {props.corrections[key].join(", ")}
                        </li>

                    ))
                }

            </ul>
    </div>
  );
}
export default Correction;