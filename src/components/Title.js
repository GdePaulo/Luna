import React, { useEffect, useState } from 'react';
function Title(props) {
    
    return (
    <div>
      <h1 className="luna-description luna-description__title">{props.title}</h1>
      <h3 className="luna-description luna-description__explanation">{props.children}</h3>
    </div>
    );
}
export default Title;