import React, { useEffect, useState } from 'react';
function Spinner(props) {
    
  const spinnerContainerClasses = props.isHidden ? "spinner__container hidden" : "spinner__container"
  const spinnerClasses = props.isHidden ? "spinner__loader hidden" : "spinner__loader"
  return (
    <div className={spinnerContainerClasses}>
      <div className={spinnerClasses}>
      </div>
    </div>
  );
}
export default Spinner