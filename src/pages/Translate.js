import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Grid from "../components/Grid"
import Button from "../components/Button"
import TranslationForm from "../components/TranslationForm"

function Translate() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState({});

  return (
    <div>
      <h3>Luna: Translate</h3>
      console.log("test")
      <TranslationForm />
    </div>
  );
}
export default Translate;