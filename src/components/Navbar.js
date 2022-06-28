import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from "../css/navbar.module.css";
import moon from "../images/moon.svg"
// import {ReactComponent as moon} from "../images/moon.svg"
function Navbar() {
    const navigationElements = [
        {to:"/", text: "Home"},
        {to:"/about", text: "About"},
        {to:"/projects", text: "Projects"},
        {to:"/", text: "Luna Software"},
        {to:"/cool", text: "Cool"},
        {to:"/spellcheck", text: "Spellcheck"},
        // {to:"/ai", text: "AI"},
        {to:"/translate", text: "Translate"}
    ];
    const [activeId, setActiveId] = useState(0);
    const location = useLocation();

    return (
        <div className={styles.topnav}>
            <ul className={styles.topnav__items}>
                {
                    navigationElements.map((x, index) => (
                        <li key={index} className= {styles.topnav__item + " " + (index===3 ? styles["topnav__item--logo"] : "")}>
                        <Link to={x.to} onClick={() => setActiveId(index)} 
                            className= {styles.topnav__link + " " + (index===3 ? styles["topnav__link--logo"] : "") + " " 
                            + (location.pathname===x.to && index !== 3  ? styles.active : "")}>
                            <span className={styles.topnav__text + " " + (index===3 ? styles["topnav__text--logo"] : "")}>{x.text}</span>
                            {index===3 ? (
                                <img src={moon} alt={"logo"} className= {styles["topnav__logo-img"]}/>
                            ) : null}
                        </Link>
                        </li>

                    ))
                }

            </ul>
        </div>
    );
}
export default Navbar;

// center alignment with logo in the middle white background and black text or gray and when hover a line on the bottom possibly gray