import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { handleChange } from 'react';


export default function PostAdd({ setCanvi }) {


  let { authToken, setAuthToken } = useContext(UserContext);
  let [formulari, setFormulari] = useState({})
  let [error, setError] = useState("");
  let { body, upload, longitude, latitude, visibility} = formulari;
  const formData = new FormData();
  formData.append("body", body);
  formData.append("upload", upload);
  formData.append("longitude", longitude);
  formData.append("latitude", latitude);
  formData.append("visibility", visibility);
 
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((pos) => {

      setFormulari({
  
  
        ...formulari,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
  
      })
  
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
    
  
  },[]);

  const handleChange = (e) => {
    if (e.target.type && e.target.type==="file")
  {
    setFormulari({
      ...formulari,
      [e.target.name] : e.target.files[0] 
    })
  } else {
    setFormulari({
      ...formulari,
      [e.target.name] : e.target.value
  })}
  }

  const SendPost = async (e) => {
    e.preventDefault();

    // Enviam dades a l'aPI i recollim resultat
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData
      });


      const resposta = await data.json();
      console.log(resposta)
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
        <h1>Afegir Post +</h1>

        <i class="fa fa-user"></i>
        <form>
          <label for="name">Body</label><br></br>
          <input class="form-control" type="text" name="body" value={formulari.body} onChange={handleChange} ></input><br></br>
          <label for="longitud">Longitud</label><br></br>
          <input class="form-control" type="text" name="longitud" value={formulari.longitude} onChange={handleChange}></input><br></br>
          <label for="latitud">Latitud</label><br></br>
          <input class="form-control" type="text" name="latitud" value={formulari.latitude} onChange={handleChange} ></input><br></br>
          <label for="upload">Archivo</label><br></br>
          <input class="form-control" type="file" name="upload" value={formulari.file} onChange={handleChange} ></input><br></br>


          <label for="visibility">Visibilidad</label><br></br>
          <input class="form-control" type="text" name="visibility" value={formulari.visibility} onChange={handleChange}></input><br></br>
        </form>

        <button
          onClick={(e) => {
            SendPost(e);
          }}
        >
          Add post      </button>
        {error ? <div>{error}</div> : <></>}

        <br></br><button
        >
          reset
        </button>

      </div>
    </>
  );
}

