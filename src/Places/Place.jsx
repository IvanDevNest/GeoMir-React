import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useEffect } from 'react';
import { useState } from 'react';
import PlacesGrid from './PlacesGrid';
import { useNavigate } from 'react-router-dom';
import ReviewList from './Reviews/ReviewList';
import { useFetch } from '../hooks/useFetch';



const Place = () => {
  let [isLoading, setLoading] = useState(true)
  let { authToken, setAuthToken } = useContext(UserContext);
  let [place, setPlace] = useState([]);
  let { usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();



  const { id } = useParams();
  const getPlace = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      console.log(isLoading)

      if (resposta.success === true) {
        console.log(resposta)
        setPlace(resposta.data)
        setLoading(false)
        console.log(isLoading)

      }
      else setError(resposta.message);
    } catch {
      console.log("Error");
      alert("Catchch");
    };

  }
  useEffect(() => {
    getPlace();

  }, []);
  const deletePlace = async (id) => {
    try {
      const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/"+id), {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "DELETE",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("place eliminado")
        navigate("/places/list")
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch {
      console.log("Error");
      alert("Catchch");
    };
  }



  return (
    <>

      {isLoading ? "cargando..." : <>
        <table>
        <img class="img-fluid" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} title="Image preview" width="300px" />

          <tr>
            <td>ID</td>
            <td>{place.id}</td>
          </tr>
          <tr>
            <td>Nombre</td>
            <td>{place.name}</td>


          </tr>

          <tr>
            <td>Autor</td>
            <td>{place.author.name}</td>

          </tr>
          <tr>
            <td>Descripcio</td>
            <td>{place.description}</td>

          </tr>
        </table>
        {usuari == place.author.email ?
                    <>
                        <button onClick={(e) => {navigate("/places/edit/"+place.id)}}>📝</button> 
                        <button onClick={(e) => {deletePlace(place.id)}}>🗑️</button>
                    </>
                    : <></>} 

      </>
      }
                <ReviewList />

    </>
  )
}

export default Place