import React from 'react';
import styles from "../css/tform.module.css";

function Translations(props) {

  return (
    <div className={styles.tform__corrections}>
      {props.translations}
    </div>
  );
}
export default Translations;