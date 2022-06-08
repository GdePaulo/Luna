import React, { useEffect, useState } from 'react';
// import parser from "react-html-parser";

function Correction(props) {
  return (
    <div className="tform__corrections">
      <ol className="tform__items">
                {
                  Object.keys(props.corrections).map((key, index) => ( 
                        <li className="tform__item">
                        
                        <span className={props.activeCorrectionId==index ?
                          "tform__corrected-word tform__corrected-word--active tform__corrected-word--source" :
                          "tform__corrected-word tform__corrected-word--source"
                          }>{key}</span>
                        {props.corrections[key].map(corr =>
                          <span className="tform__corrected-word tform__corrected-word--correction">{corr}</span>
                          )}
                        </li>

                    ))
                }

            </ol>
    </div>
  );
}
export default Correction;