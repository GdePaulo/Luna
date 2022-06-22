import React, { useEffect, useState } from 'react';
import styles from "../css/title.module.css";
function Title(props) {
    return (
    <div>
      <h1 className={`${styles["luna-description"]} ${styles["luna-description__title"]}`}>{props.title}</h1>
      <h3 className={`${styles["luna-description"]} ${styles["luna-description__explanation"]}`}>{props.children}</h3>
    </div>
    );
}
export default Title;