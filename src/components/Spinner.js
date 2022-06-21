import React, { useEffect, useState } from 'react';

// import CSSModules from "reactive-css-module"
import styles from "../css/spinner.module.css";

function Spinner(props) {
    
  const spinnerClasses = props.isHidden ? `${styles.spinner} ${styles.hidden}` : styles.spinner
  const spinnerLoaderClasses = props.isHidden ? `${styles.spinner__loader} ${styles.hidden}` : styles.spinner__loader
  return (
    <div className={spinnerClasses}>
      <div className={spinnerLoaderClasses}>
      </div>
    </div>
  );
}
export default Spinner