import React, { useEffect, useState } from 'react';
import CorrectionPopup from "../components/CorrectionPopup";

function Highlighted(props) {
    
  const [state, setState] = useState('');
  const corrections = {
    sure: ["sures", "her"],  
    war: ["born", "car"],  
  }
  const test = "what im sure hes not born war anytime soon"

  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    // setState(event.currentTarget.textContent);
    const textWithOptions = test.split(" ").map(word => {
      console.log("Has own property for", word, "is", corrections.hasOwnProperty(word))
      if (corrections.hasOwnProperty(word)){
        
        return <CorrectionPopup className="highlighted__corPopup" typo={word} />;
      } else {
        return word;
      }
    })
    setState(
      <p className="highlighted__p">{textWithOptions}</p>
      // <p className="highlighted__p">Im not sure  <CorrectionPopup className="highlighted__corPopup" typo="sure" /> or what
      // </p>
    );
    console.log(event.currentTarget.textContent);
  }

  return (
    <div contentEditable onInput={handleChange} className="highlighted">{state}</div>
  );
}
export default Highlighted;