import React, { useEffect, useState } from 'react';
import CorrectionPopup from "../components/CorrectionPopup";

function Highlighted(props) {
    
  const [state, setState] = useState('');


  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    // setState(event.currentTarget.textContent);
    setState(<p>Im not sure  <CorrectionPopup/></p>);
    console.log(event.currentTarget.textContent);
  }

  return (
    <div contentEditable onInput={handleChange}>whatever {state}</div>
  );
}
export default Highlighted;