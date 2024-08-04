import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";


      export default function Dictionary (props)
    {
      let [keyword, setKeyword]= useState(props.defaultKeyword);
      let [results , setResults]= useState(null);
      let [loaded, setLoaded] =  useState(false);
      let [photos, setPhotos]= useState(null);




    function handleDictionResponse(response){
      setResults(response.data[0]);
    }


  function handlePexelsResponse(response){
    setPhotos(response.data.photos);

  }

   

    function search (){

     //documentation: https://mydictionaryapi.dev/e     
     let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;
     axios.get(apiUrl).then(handleDictionResponse);
    
  let pexelsApiKey = "2tb5293558cf27710004o841aef8f671";
  let pexelsApiUrl = `https://api.shecodes.io/images/v1/search?query=${keyword}&key=2tb5293558cf27710004o841aef8f671`;
  let headers = { authorization: `Bearer ${pexelsApiKey}` };
  axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);
  }

   function handleSubmit(event){
      event.preventDefault();
      search ();

    }


    function handleKeyWordChange(event)
    {
        setKeyword(event.target.value);
    }


      function load (){
        setLoaded(true);
        search();
      }

    if (loaded){
    return ( <div className="Dictionary"> 
    <section> 
        <h1> What are you looking up? </h1>
             <form onSubmit={handleSubmit}>  
             <input type="search" onChange= {handleKeyWordChange}
             defaultValue={props.defaultKeyword} />
    </form>
    <div className="hint">
        suggested words: wine, franance, yoga, tree..
    </div>
    </section>
    <Results results={results} />
    <Photos photos={photos} />
    </div>
    );
    } else {
        load();
        return "Loading";
    }
    }
