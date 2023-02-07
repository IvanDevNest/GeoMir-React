import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceGrid from './PlaceGrid';

const PlacesGrid = () => {
  let [places, setPlaces] = useState([]);
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);




  const getPlaces = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setPlaces(resposta.data);
        console.log(resposta.data
        )

      }
      else setError(resposta.message);
    } catch {
      console.log("Error");
      alert("Catchch");
    };

  }

  useEffect(() => {
    getPlaces();

  }, []);

  return (
    <>
      {places.map((place) => (

        <div key={place.id}> {<PlaceGrid place={place} />} </div>

      ))}
    </>
  )
}

export default PlacesGrid