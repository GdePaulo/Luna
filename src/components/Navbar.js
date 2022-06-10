import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moon from "../images/moon.svg"
function Navbar() {
    const navigationElements = [
        {to:"/", text: "Luna"},
        {to:"/", text: "Home"},
        {to:"/about", text: "About"},
        {to:"/projects", text: "Projects"},
        {to:"/cool", text: "Cool"},
        {to:"/ai", text: "AI"},
        {to:"/translate", text: "Translate"}
    ];
    const [activeId, setActiveId] = useState(0);
    return (
        <div className="topnav">
            <ul className="topnav__items">
                {
                    navigationElements.map((x, index) => (
                        <li className= "topnav__item">
                        <Link to={x.to} onClick={() => setActiveId(index)} className= {"topnav__link " + (activeId===index ? "active" : "")}>
                        <span className={index==0 ? "topnav__logo-text" : "topnav__text"}>{x.text}</span>
                        {index==0 ? (
                            <img src={moon} alt={"logo"} className= "topnav__logo-img"/>
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