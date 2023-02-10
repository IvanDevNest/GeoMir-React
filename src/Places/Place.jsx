import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useEffect } from 'react';
import { useState } from 'react';
import PlacesGrid from './PlacesGrid';


const Place = () => {
  let [isLoading, setLoading] = useState(true)
  let { authToken, setAuthToken } = useContext(UserContext);
  let [place, setPlace] = useState([]);

  const { id } = useParams();
  const getPlace = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "POST",
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


  return (
    <>

      {isLoading ? "cargando..." : <>
        <table>
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

      </>
      }

    </>
  )
}

export default Place