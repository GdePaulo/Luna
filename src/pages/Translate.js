import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Grid from "../components/Grid"
import Button from "../components/Button"
import Highlighted from "../components/Highlighted"
import TranslationForm from "../components/TranslationForm"

function Translate() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    axios.get('/time')
    .then(response => {
      setCurrentTime(response.data.time)
    }, error => {
      console.log(error);
    });
  // The second parameter defines what states this depends on. 
  // This means only initially and not specifying means depend on every state (i.e also setCurrentTime)
  }, []);

  return (
    <div>
      <h3>Luna: Translate | Time: {currentTime}</h3>
      console.log("test")
      <Highlighted />
      <TranslationForm />
    </div>
  );
}
export default Translate;