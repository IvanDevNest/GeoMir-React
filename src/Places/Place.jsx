import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useEffect } from 'react';

const Place = () => {

    let { authToken, setAuthToken } = useContext(UserContext);
    let { place, setPlace } = useContext(UserContext);

    const {id} = useParams();
    const getPlace = async ()=> {
        try {
          const data = await fetch("https://backend.insjoaquimmir.cat/api/places/{id}", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + authToken, 
            },
            method: "GET",
          });
          const resposta = await data.json();
          if (resposta.success === true) {
            console.log(resposta)
    
          }        
          else setError(resposta.message);
        } catch{
          console.log("Error");
          alert("Catchch");
        }; 
           
    }
  


  return (
    <div>{id}</div>
  )
}

export default Place