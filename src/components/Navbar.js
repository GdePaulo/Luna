import React from 'react';
import {  Link } from "react-router-dom";
function Navbar() {
    return (
        <div>
            <li>
            <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="/about">About</Link>
            </li>
            <li>
            <Link to="/sheeps">Sheeps</Link>
            </li>
            <li>
            <Link to="/goats">Goats</Link>
            </li>
        </div>
    );
}
export default Navbar;