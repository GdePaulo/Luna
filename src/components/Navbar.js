import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
function Navbar() {
    const navigationElements = [
        { id: 1, to:"/", text: "Home"},
        { id: 2, to:"/about", text: "About"},
        { id: 3, to:"/projects", text: "Projects"},
        { id: 4, to:"/cool", text: "Cool"}
    ];
    const [activeId, setActiveId] = useState(1);
    return (
        <div className="topnav">
            <ul>
                {
                    navigationElements.map((x) => (
                        <li>
                        <Link to={x.to} onClick={() => setActiveId(x.id)} className={activeId===x.id ? "active" : ""}>
                        {x.text}
                        </Link>

                        </li>

                    ))
                }

            </ul>
        </div>
    );
}
export default Navbar;