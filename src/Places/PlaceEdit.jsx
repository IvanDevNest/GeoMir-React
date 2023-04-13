import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { handleChange } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPlace } from '../slices/places/thunks';
import { handleUpdate } from '../slices/places/thunks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function PlaceEdit() {
  let navigate = useNavigate();

  const dispatch = useDispatch()

  let { authToken, setAuthToken } = useContext(UserContext);
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");

 


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
  const { id } = useParams();
  const { place } = useSelector((state) => state.places);
  // const getPlace = async () => {

  //   // Enviam dades a l'aPI i recollim resultat
  //   try {
  //     const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "GET",
  //     });


  //     const resposta = await data.json();
  //     console.log(resposta)

  //     if (resposta.success === true) {

  //       const{data}=resposta
  //       setFormulari({
  //         name: data.name,
  //         description: data.description,
  //         upload: "",
  //         latitude: data.latitude,
  //         longitude: data.longitude,
  //         visibility: data.visibility.id


  //       })
  //       console.log(data)
  //       console.log(formulari)

  //     }
  //     else alert("La resposta no ha triomfat");


  //   } catch (err) {
  //     console.log("Error read");
  //     console.log(err);
  //     alert("catch");
  //   }
  // };





  useEffect((e) => {
    dispatch(getPlace(authToken,id));
  }, []);

  useEffect(() => {
    console.log(place)
    setFormulari({
      name: place.name,
      description: place.description,
      longitude: place.longitude,
      latitude: place.latitude,
      visibility: place.visibility.id
    })
  }, [place])



  return (
    <>

      <div class="login-form">
        <h1>Editar Place +</h1>

        <i class="fa fa-user"></i>
        <form>
          <label for="name">Nombre</label><br></br>
          <input class="form-control" type="text" name="name" value={formulari.name} onChange={handleChange} ></input><br></br>
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

        <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault(),
                dispatch(handleUpdate(authToken, id, formulari, navigate));
              }}>Update</button>
        {error ? <div>{error}</div> : <></>}

        <br></br><button
        >
          reset
        </button>

      </div>
    </>
  );
}