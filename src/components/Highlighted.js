import React, { useEffect, useState } from 'react';
function Highlighted(props) {
    
  const [state, setState] = useState('');


  const handleChange = (event) => {
    // this.setState({ value: event.target.value });
    // this.setState({ value: event.currentTarget.textContent });
    setState(event.currentTarget.textContent);
    console.log(event.currentTarget.textContent);
  }

  return (
    <div contentEditable onInput={handleChange}>whatever {state}</div>
  );
}
export default Highlighted;