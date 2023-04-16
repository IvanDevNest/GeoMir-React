import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { handleChange } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../slices/posts/thunks';
import { useDispatch } from 'react-redux';



export default function PostAdd({ setCanvi }) {

  let navigate = useNavigate();
  const dispatch = useDispatch();


  let { authToken, setAuthToken } = useContext(UserContext);
  let [formulari, setFormulari] = useState({})
  let [error, setError] = useState("");
  let { body, upload, latitude, longitude, visibility=1 } = formulari;
  const formData = new FormData();
  formData.append("body", body);
  formData.append("upload", upload);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
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

  // const SendPost = async (e) => {
  //   e.preventDefault();

  //   // Enviam dades a l'aPI i recollim resultat
  //   try {
  //     const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "POST",
  //       body: formData
  //     });


  //     const resposta = await data.json();
  //     console.log(resposta)
  //     if (resposta.success === true)       navigate("/posts/list")
  //     ;
  //     else alert("La resposta no ha triomfat");


  //   } catch {
  //     console.log("Error");
  //     alert("catch");
  //   }
  // };






  return (
    <>

      <div class="login-form">
        <h1>Afegir Post +</h1>

        <i class="fa fa-user"></i>
        <form>
          <label for="description">Body</label><br></br>
          <input class="form-control" type="text" name="body" value={formulari.body} onChange={handleChange} ></input><br></br>
          <label for="upload">Archivo</label><br></br>
          <input class="form-control" type="file" name="upload" value={formulari.file} onChange={handleChange} ></input><br></br>
          <label for="latitud">Latitud</label><br></br>
          <input class="form-control" type="text" name="latitud" value={formulari.latitude} onChange={handleChange} ></input><br></br>
          <label for="longitud">Longitud</label><br></br>
          <input class="form-control" type="text" name="longitud" value={formulari.longitude} onChange={handleChange}></input><br></br>
          <label for="visibility">Visibility</label>

            <select name="visibility" value={formulari.visibility} onChange={handleChange} className="form-control"  >
              <option value="1">public</option>
              <option value="2">contacts</option>
              <option value="3">private</option>
            </select>
        </form>

        <button onClick={() => {
            dispatch(addPost(formData,authToken,navigate))
          }}>
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

