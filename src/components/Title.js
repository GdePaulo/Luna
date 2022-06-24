import React, { useEffect, useState } from 'react';
import styles from "../css/title.module.css";
function Title(props) {
    return (
    <div>
      <h1 className={`${styles["luna-description"]} ${styles["luna-description__title"]}`}>{props.title}</h1>
      <p className={`${styles["luna-description"]} ${styles["luna-description__explanation"]}`}>{props.children}</p>
    </div>
    );
}
export default Title;