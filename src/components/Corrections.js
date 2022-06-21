import React, { useEffect, useState, useRef } from 'react';
import styles from "../css/tform.module.css";
import { act } from 'react-dom/test-utils';
// import parser from "react-html-parser";

function Correction(props) {
  const activeItem = useRef();

  useEffect(() => {
    if (activeItem != null)
      activeItem.current.scrollIntoView({ behavior: "smooth" });
  }, [props.activeCorrectionId]);
  
  return (
    <div className={styles.tform__corrections}>
      {Object.keys(props.corrections).length == 0
        ? <h3 className={styles["tform_correct-msg"]}> Everything seems to be correct!</h3>
        : null}
      <ol className={styles.tform__items}>
                {
                  Object.keys(props.corrections).map((key, index) => ( 
                        
                        <li className={styles.tform__item} ref={props.activeCorrectionId==index ? activeItem : null}>
                        
                        <span className={`${styles["tform__corrected-word"]} ${styles["tform__corrected-word--source"]}` + " "
                          + (props.activeCorrectionId==index ?
                          styles["tform__corrected-word--active"] :
                          "")
                          }>{key}</span>
                        {props.corrections[key].map(corr =>
                          <span className={`${styles["tform__corrected-word"]} ${styles["tform__corrected-word--correction"]}`}>{corr}</span>
                          )}
                        </li>
                    ))
                }
            </ol>
    </div>
  );
}
export default Correction;