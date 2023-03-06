import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceGrid from './PlaceGrid';
import { useFetch } from '../hooks/useFetch';

const PlacesGrid = () => {
  let [places, setPlaces] = useState([]);
  let { authToken, setAuthToken } = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);




  const { data, error, loading, setUrl } = useFetch('https://backend.insjoaquimmir.cat/api/places', {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    },
    method: "GET",
  });

  return (
    <>
      {loading?<h1>loadig...</h1>:(data.data).map((place) => (

<div key={place.id}> {<PlaceGrid place={place} />} </div>

))}
    </>
  )
}

export default PlacesGrid