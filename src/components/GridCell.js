import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
function GridCell(props) {
    
    return (
        <div className={props.className}>
      {props.id}---{props.neighbors}
    </div>
    );
}
export default GridCell;