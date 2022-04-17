import React, { useEffect, useState } from 'react';
import axios from 'axios';

import rabbit from "../rabbit.png"
import sample from "../ramen.jpg"

import Grid from "../components/Grid"
import Button from "../components/Button"
import AiForm from "../components/AiForm"

function Ai() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState({});

  return (
    <div>
      <h3>AI</h3>

      <AiForm
        onFileSelectSuccess={(file) => setSelectedFile(file)}
        onFileSelectError={({ error }) => alert(error)}
      />
      <Button
        onClick={() => {
          console.log("pressed the button with file name", selectedFile.name);

          const url = "http://localhost:9080/predictions/foodnet";

          axios({
            method: "post",
            url: url,
            data: selectedFile,
            headers: {
              "Content-Type": "image/jpeg",//"multipart/form-data",
              "accept": "*/*"
            },
          }).then(res => { console.log("Response:", res.data); setPrediction(res.data) })
            .catch(error => console.log(error));

        }}
        children="Tyrone" />
      <ul>
        {Object.keys(prediction).map((k, i) => (<li>{k} : {prediction[k]}</li>))}
      </ul>
    </div>
  );
}
export default Ai;

/*

I finally fixed the issue allowing for images to be posted locally. I have like 25 open tabs. I first had to deal with cross origin request issues, and then just issues with the server
returning errors. Inspecting the access logs and the debug log and looking into curl and what the functions does and inspecting what it is sending and what the serve model expects.
Trying different forms of requests different ways of calling axios. At some point I got a bit closer by sending form data, but was getting 503 and 500 errors and the log is hard to interpret.
Also issues with suddenly not receiving data and then realizing I have to restart server, changing configuration and having to restart server.
It doesn't even work unless I specify the second method of defining axios. It clued me in that this might work better after investigating -X parameter and seeing that it doesn't work without it,
so that likely it doesn't really accept a real post request. I tried using form data, had to change the type for that one. I tried converting it to binary
What headers I need more cross origin issues with header type, looking into converting image to binary string, looking into possibly having to change handlers. Looking into what
exactly the file variable contains. I finally fixed it by just sending the file object, but setting the appropriate mime type which I saw after printing the file object.
I have to make the form division and composition more tidy and clean up now.
may be the other method without headers would work

https://www.digitalocean.com/community/tutorials/react-axios-react
https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react
https://surajsharma.net/blog/react-upload-file-using-axios
https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples

https://github.com/pytorch/serve/issues/760
https://blog.ceshine.net/post/torchserve/
https://github.com/pytorch/serve/issues/529
*/
