import React, { useEffect, useState } from 'react';
import styles from "../css/tform.module.css";

function Editor(props) {
  const handleChange = (event) => {
    props.handleTextChange(event);
  }
  
  return (
    <textarea autoFocus onChange={handleChange} className={`${styles.tform__input} ${styles["tform__input--editor"]}`} value={props.currentText} placeholder={props.placeholder}/>
  );
}
export default Editor;