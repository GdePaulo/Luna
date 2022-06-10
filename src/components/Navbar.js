import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import moon from "../images/moon.svg"
function Navbar() {
    const navigationElements = [
        { id: 1, to:"/", text: "Luna"},
        { id: 2, to:"/about", text: "About"},
        { id: 3, to:"/projects", text: "Projects"},
        { id: 4, to:"/cool", text: "Cool"},
        { id: 5, to:"/ai", text: "AI"},
        { id: 6, to:"/translate", text: "Translate"}
    ];
    const [activeId, setActiveId] = useState(1);
    return (
        <div className="topnav">
            <ul className="topnav--items">
                {
                    navigationElements.map((x) => (
                        <li className= "topnav--item">
                        <Link to={x.to} onClick={() => setActiveId(x.id)} className= {"topnav--link " + (activeId===x.id ? "active" : "")}>
                        {x.text}
                        {x.id==1 ? (
                            <img src={moon} alt={"logo"} className= "topnav--logo"/>
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