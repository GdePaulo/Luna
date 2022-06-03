import React, { useEffect, useState } from 'react';

function Highlighted(props) {
  const handleChange = (event) => {
    props.handleTextChange(event);
  }

  return (
    // <div contentEditable onInput={handleChange} className="highlighted">{state}</div>
    <textarea onChange={handleChange} className="tform__txtarea"/>
  );
}
export default Highlighted;