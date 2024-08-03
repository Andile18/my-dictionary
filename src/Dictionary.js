import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";
import "./Dictionary.css";


      export default function Dictionary (props)
    {
      let [keyword, setKeyword]= useState(props.defaultKeyword);
      let [results , setResults] = useState(null);
      let [loaded, setLoaded] =useState(false);



      function handleResponse (response){
      setResults(response.data[0]);
    }

    function search (){

     //documentation: https://mydictionaryapi.dev/e     
     let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${keyword}`;

     axios.get(apiUrl).then(handleResponse);


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
        suggested words: sunset, franance, yoga, tree..
    </div>
    </section>
    <Results results={results} />
    </div>
    );
    } else {
        load();
        return "Loading";
    }
    }