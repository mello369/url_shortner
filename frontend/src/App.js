import logo from './logo_main.gif';
import './App.css';

import React,{useState} from 'react';
import Axios from 'axios';





function App() {



  const [bigURL,setBig] =useState('');
  const [smallURL,setSmall]=useState('');
  const copyText=()=>{
    navigator.clipboard.writeText(smallURL)
  }

  /////////////// API //////////////////////


  // const onSubmit = async (e) =>
  // {
  //     e.preventDefault();
  //     console.log(bigURL);
  //     try{
  //         Axios.post(
  //           "http://ec2-43-205-118-139.ap-south-1.compute.amazonaws.com/api/v1/",
  //           {url:bigURL}
  //         )
  //         .then(async res=> {
  //             console.log(res);
  //             const resp=JSON.parse(res);
  //             setSmall(resp.short)
  //         })
  //     }
  //     catch(e)
  //     {
          
  //         console.log(e)
          
  //     }      
  // }

  const onSubmit = async (e) =>
  {
      e.preventDefault();
      console.log(bigURL);

      const url="http://cutt.ly/api/api.php?key=1edb143b63326b465e8eaae897e07c377f557&short="+bigURL+"&userDomain=0";
      console.log(url);
      try{
          Axios.get(
            url
          )
          .then(async res=> {
              console.log(res);
              const resp=JSON.parse(JSON.stringify(res));
              console.log(resp);
              console.log(resp.data.url.shortLink)
              setSmall(resp.data.url.shortLink)
          })
      }
      catch(e)
      {
          
          console.log(e)
          
      }      
  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo"/>
        <h1>URL Shortner</h1>
        <label>Enter URL:</label>
        <input type="text"  value = {bigURL} onChange={(e) =>
                    setBig(e.currentTarget.value)}></input>
        <button id="submit-btn" onClick = {onSubmit}>Create</button>
        <label>Shortened URL:</label>
        {smallURL}
        <button id="copy_btn" onClick={copyText}>Copy</button>
      </header>
    </div>
  );
}

export default App;
