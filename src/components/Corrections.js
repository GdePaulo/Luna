import React, { useEffect, useState, useRef } from 'react';
import { act } from 'react-dom/test-utils';
// import parser from "react-html-parser";

function Correction(props) {
  const activeItem = useRef();

  useEffect(() => {
    if (activeItem != null)
      activeItem.current.scrollIntoView({ behavior: "smooth" });
  }, [props.activeCorrectionId]);
  
  return (
    <div className="tform__corrections">
      <ol className="tform__items">
                {
                  Object.keys(props.corrections).map((key, index) => ( 
                        
                        <li className="tform__item" ref={props.activeCorrectionId==index ? activeItem : null}>
                        
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