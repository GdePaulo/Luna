import React, { useEffect, useState } from 'react';
import axios from 'axios';

import rabbit from "../rabbit.png"
import sample from "../ramen.jpg"

import Grid from "../components/Grid"
import Button from "../components/Button"
import AiForm from "../components/AiForm"

function Ai() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [binaryFile, setBinaryFile] = useState(null);


  return (
    <div>
      <h3>AI</h3>

      <AiForm onFileSelectSuccess={(file) => setSelectedFile(file)} />
      <Button
        onClick={async () => {
          console.log("pressed the button with file name", selectedFile.name);
          const formData = new FormData();
          formData.append("file", selectedFile, selectedFile.name);
          const config = {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            // 'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          }
          const url = "http://localhost:9080/predictions/foodnet";
          //const article = { };
          //  axios.post('http://localhost:9080/ping')
          // axios.post('http://localhost:9080/predictions/foodnet', selectedFile, config)
          // .catch(error => {
          //     console.error('There was an error!', error);
          //   })
          //     .then(response => {console.log("response:",response.data)});
            let reader = new FileReader();
            let file = selectedFile;
            console.log(file); //I can see the file's info
            reader.onload= () => {
                var array = new Uint32Array(reader.result); // read the actual file contents
                console.log("_+_array:",array); // the array is empty!
                var binaryString = String.fromCharCode.apply(null,array) ;
                console.log("__binaryString:",binaryString);
            //   this.setState({
            //     binaryfile: binaryString
            //   },()=>{
            //     console.log(this.state.file);//ergo file is set to an empty image
            // });
            }
            reader.readAsArrayBuffer(file);
        
          try {
            const response = await axios({
              method: "post",
              url: url,
              data: selectedFile,//formData,
              headers: {
                 "Content-Type": "image/jpeg",//"multipart/form-data",
                 "accept": "*/*"
                //  "Content-Length": "162243"
             },
            });
            if(response.status == 200){
              // test for status you want, etc
              console.log(response.status);
          }  
          console.log(response.data);
          } catch (error) {
            console.log(error);
          }


        }}
        children="Tyrone" />
    </div>
  );
}
export default Ai;