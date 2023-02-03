import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";


export default function Login({ setCanvi }) {


  let [email, setEmail] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);
  let {formulari, setFormulari} = useContext({})
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let { name, description, upload, latitude, longitude, visibility } = formulari;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("upload", upload);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("visibility", visibility);
  navigator.geolocation.getCurrentPosition((pos) => {


    setFormulari({


      ...formulari,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude

    })

    console.log("Latitude is :", pos.coords.latitude);
    console.log("Longitude is :", pos.coords.longitude);
  });


  const sendLogin = async (e) => {
    e.preventDefault();

    // Enviam dades a l'aPI i recollim resultat
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData
      });


      const resposta = await data.json();
      if (resposta.success === true) setAuthToken(resposta.authToken);
      else alert("La resposta no ha triomfat");


    } catch {
      console.log("Error");
      alert("catch");
    }
  };






  return (
    <>

      <div class="login-form">
        <h1>Afegir Place +</h1>

        <i class="fa fa-user"></i>
        <form>
          <label for="name">Nombre</label><br></br>
          <input class="form-control" type="text" name="name" value={formulari.name} onChange={handleChange} ></input><br></br>
          <label for="description">Descripcion</label><br></br>
          <input class="form-control" type="text" name="description" value={formulari.description} onChange={handleChange} ></input><br></br>
          <label for="upload">Archivo</label><br></br>
          <input class="form-control" type="file" name="upload" value={formulari.upload} onChange={handleChange} ></input><br></br>
          <label for="latitud">Latitud</label><br></br>
          <input class="form-control" type="text" name="latitud" value={formulari.latitude} onChange={handleChange} ></input><br></br>
          <label for="longitud">Longitud</label><br></br>
          <input class="form-control" type="text" name="longitud" value={formulari.longitude} onChange={handleChange}></input><br></br>
          <label for="visibility">Visibilidad</label><br></br>
          <input class="form-control" type="text" name="visibility" value={formulari.visibility} onChange={handleChange}></input><br></br>
        </form>

        <button
          onClick={(e) => {
            sendLogin(e);
          }}
        >
          Add place      </button>
        {error ? <div>{error}</div> : <></>}

        <br></br><button
        >
          reset
        </button>

      </div>
    </>
  );
}

