import React, { useEffect, useState } from 'react';
import CorrectionPopup from "../components/CorrectionPopup";

function Highlighted(props) {
    
  const [state, setState] = useState('');


  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    // setState(event.currentTarget.textContent);
    setState(<p className="highlighted__p">Im not sure  <CorrectionPopup className="highlighted__corPopup"/></p>);
    console.log(event.currentTarget.textContent);
  }

  return (
    <div contentEditable onInput={handleChange} className="highlighted">whatever {state}</div>
  );
}
export default Highlighted;