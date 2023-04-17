/**

@import React and its hooks, and other dependencies
*/
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { handleChange } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPlace } from '../slices/places/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"; 

/**

This component allows the user to add a new place
@param {function} setCanvi - a function that sets a state variable in the parent component
@returns {JSX.Element} - a form that allows the user to add a new place
*/
export default function PlaceAdd({ setCanvi }) {
  const { register, handleSubmit , formState: { errors },setValue} = useForm();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let { authToken, setAuthToken } = useContext(UserContext);
  let [formulari, setFormulari] = useState({})
  let [error, setError] = useState("");
  let { name, description, upload, latitude, longitude, visibility } = formulari;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("upload", upload);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("visibility", visibility);

  /**
  
  Use effect hook that gets the user's current position when the component mounts
  */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {

      setFormulari({

        ...formulari,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude

      })

      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });

  }, []);

  /**
  
  Function that handles changes in the form input fields
  @param {Event} e - the event object
  */
  const handleChange = (e) => {
    if (e.target.type && e.target.type === "file") {
      setFormulari({
        ...formulari,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setFormulari({
        ...formulari,
        [e.target.name]: e.target.value
      })
    }
  }
  /**
  
  Function that sends the form data to the backend when the form is submitted
  @param {Event} e - the event object
  */
  const SendPlace = async (e) => {
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
      console.log(resposta)
      if (resposta.success === true) navigate("/places/list")
        ;
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
          <input {...register("name", {
            required: "Aquest camp és obligatori",
            maxLength: {
              value: 255,
              message: "El nom pot contenir un maxim de 255 caràcters"
            },
           
          })} type="text"
            // value={formulari.name} onChange={handleChange} name="name"
              className="form-control" ></input><br></br>          {errors.name && <p>{errors.name.message}</p>}
              
          <label for="description">Descripcion</label><br></br>
          <input class="form-control" type="text" name="description" value={formulari.description} onChange={handleChange} ></input><br></br>
          <label for="upload">Archivo</label><br></br>
          <input class="form-control" type="file" name="upload" value={formulari.file} onChange={handleChange} ></input><br></br>
          <label for="latitud">Latitud</label><br></br>
          <input class="form-control" type="text" name="latitud" value={formulari.latitude} onChange={handleChange} ></input><br></br>
          <label for="longitud">Longitud</label><br></br>
          <input class="form-control" type="text" name="longitud" value={formulari.longitude} onChange={handleChange}></input><br></br>
          <label for="visibility">Visibilidad</label><br></br>
          <input class="form-control" type="text" name="visibility" value={formulari.visibility} onChange={handleChange}></input><br></br>
        </form>

        <button onClick={() => {
          dispatch(addPlace(authToken, formData))
        }}>
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

