import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceGrid from './PlaceGrid';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPlaces } from '../slices/places/thunks';
import Paginate from './Paginate';

const PlacesGrid = () => {
  let { authToken, setAuthToken,} = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);



    const { places, isLoading, page, filter} = useSelector((state) => state.places);

  const dispatch = useDispatch();


  useEffect(() => {

  dispatch(getPlaces(authToken, page));
}, [page,filter]);


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