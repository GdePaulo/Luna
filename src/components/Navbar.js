import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moon from "../images/moon.svg"
// import {ReactComponent as moon} from "../images/moon.svg"
function Navbar() {
    const navigationElements = [
        {to:"/", text: "Home"},
        {to:"/about", text: "About"},
        {to:"/projects", text: "Projects"},
        {to:"/", text: "Luna Software"},
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
                        <li className= {"topnav__item" + (index===3 ? " topnav__item--logo" : "")}>
                        <Link to={x.to} onClick={() => setActiveId(index)} 
                            className= {"topnav__link" + (index===3 ? " topnav__link--logo" : "") + (activeId===index ? " active" : "")}>
                            <span className={"topnav__text" + (index===3 ? " topnav__text--logo" : "")}>{x.text}</span>
                            {index===3 ? (
                                // <moon />
                                // <svg xlmns={moon} alt={"logo"} fill="gray" className= "topnav__logo-img"/>
                                <img src={moon} alt={"logo"} className= "topnav__logo-img"/>
                                // <span>whatever</span>
                                // null
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