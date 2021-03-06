import React, { useEffect, useState } from 'react';
import Button from "../components/Button"

function CorrectionPopup(props) {
    
  const [corrections, setCorrections] = useState([
    { word: "better", rank: 0}, 
    { word: "worse", rank: 1}, 
    { word: props.typo, rank: 2}, 
  ]);


  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    // console.log(event.currentTarget.textContent);
  }

  return (
    <div className={props.className}> 
      {
        corrections.map((x, id) => (

          <Button className={id==2 ? props.typoClassName : ""}>{x.word}</Button>
        ))
      }
    </div>
  );
}
export default CorrectionPopup;