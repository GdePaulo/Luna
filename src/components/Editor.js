import React, { useEffect, useState } from 'react';

function Editor(props) {
  const handleChange = (event) => {
    props.handleTextChange(event);
  }

  return (
    <textarea onChange={handleChange} className="tform__txtarea" value={props.currentText}/>
  );
}
export default Editor;