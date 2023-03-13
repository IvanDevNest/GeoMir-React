import React from 'react'
import { UserContext } from '../userContext';7
import { useContext } from 'react';

const PlaceGrid = ({place}) => {
  
  return (
    <>
          <div class="pink container">
            <div class="red"><img src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} width="400px" height="400px" alt="{place.name}"></img></div>
            <div class="blue">{place.name}</div>
            <div class="orange">{place.description}</div>


          </div>
    </>

  )
}

export default PlaceGrid