import React, { useEffect, useState } from 'react';
function Button(props) {
    
    return (
        <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
    );
}
export default Button;