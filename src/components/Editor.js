import React, { useEffect, useState } from 'react';
import styles from "../css/tform.module.css";

function Editor(props) {
  const handleChange = (event) => {
    props.handleTextChange(event);
  }
  const instructions = 
  `Skibi algu akinan i primi \"koregi\" pa wak e korikshon na banda drechi. Despues di hasi esaki, bo por klek riba un di e korekshonnan pa drecha e foutnan. Bo por klek tambe riba e palabra original pa ignora un korekshon.
  `

  return (
    <textarea autoFocus onChange={handleChange} className={`${styles.tform__input} ${styles["tform__input--editor"]}`} value={props.currentText} placeholder={instructions}/>
  );
}
export default Editor;