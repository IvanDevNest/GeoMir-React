import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceGrid from './PlaceGrid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPlaces } from '../slices/places/thunks';
import { useFetch } from '../hooks/useFetch';
import Paginate from './Paginate';

const PlacesGrid = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);



    const { places, isLoading, page} = useSelector((state) => state.places);

  const dispatch = useDispatch();


  useEffect(() => {

  dispatch(getPlaces(authToken, page));
}, [page]);


  return (
    <>
      {isLoading?<h1>loadig...</h1>:(places).map((place) => (

<div key={place.id}> {<PlaceGrid place={place} />} </div>

))}
       <Paginate />
    </>
    
  )
}

export default PlacesGrid