import React, { useEffect, useState } from 'react';
import Button from "../components/Button"

function CorrectionPopup(props) {
    
  const [corrections, setCorrections] = useState([
    { word: "better", rank: 0}, 
    { word: "worse", rank: 1}, 
  ]);


  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    // console.log(event.currentTarget.textContent);
  }

  return (
    <div className={props.className}> 
      {
        corrections.map((x) => (
          <Button> {x.word}  </Button>
        ))
      }
    </div>
  );
}
export default CorrectionPopup;