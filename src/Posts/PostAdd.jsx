import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { handleChange } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../slices/posts/thunks';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";


export default function PostAdd({ setCanvi }) {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { error="", success="" } = useSelector((state) => state.posts);
  let { authToken, setAuthToken } = useContext(UserContext);
  let [formulari, setFormulari] = useState({})
  
  
  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm();
  const onSubmit = data => dispatch(sendPost(data));
  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition((pos) => {

  //     setFormulari({
  
  
  //       ...formulari,
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude
  
  //     })
  
  //     console.log("Latitude is :", pos.coords.latitude);
  //     console.log("Longitude is :", pos.coords.longitude);
  //   });
    
  
  // },[]);

  const sendPost = async (data) => {
    const file = data.upload[0];
    const tiposArchivos = ["image/gif", "image/jpg", "image/png", "image/jpeg", "video/mp4"];
    if (! tiposArchivos.includes(file.type)) {
      setError('upload', {type: 'filetype', message:"Coleguita el tipo de archivo es incorrecto, solo acepta GIF, JPG, PNG, JPEG y MP4"})
    }else if(file.size > 2048000){
      setError('upload', {type: 'filesize', message:"Coleguita el archivo no puede pesar mas de 2048KB"})
    }else{
      const data2 = { ...data, upload: data.upload[0]}
      let { body, upload, latitude, longitude, visibility=1 } = data2;
      var formData = new FormData();
      formData.append("body", body);
      formData.append("upload", upload);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("visibility", visibility);
      dispatch(addPost(formData, authToken, navigate));
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition( (pos)=> {
      setValue('latitude', pos.coords.latitude)
      setValue('longitude', pos.coords.longitude)
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
  }, [])
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
          <input class="form-control" type="text" {...register("body", {
                    required: "Coleguita este campo es obligatorio",
                    maxLength: {
                      value: 255,
                      message: " Coleguita el body no puede tener más de 255 caracteres"
                    }})} ></input><br></br>
                    {errors.body ? <div className="error">{errors.body.message}</div> : <></>}
          <label for="upload">Archivo</label><br></br>
          <input class="form-control" type="file" {...register("upload", {required: "Coleguita este campo es obligatorio",})} ></input><br></br>
          {errors.upload ? <div className="error">{errors.upload.message}</div> : <></>}
          <label for="latitud">Latitud</label><br></br>
          <input class="form-control" type="text" {...register("latitude", {required: "Coleguita este campo es obligatorio",})} ></input><br></br>
          {errors.latitude ? <div className="error">{errors.latitude.message}</div> : <></>}
          <label for="longitud">Longitud</label><br></br>
          <input class="form-control" type="text" {...register("longitude", {required: "Coleguita este campo es obligatorio",})}></input><br></br>
          {errors.longitude ? <div className="error">{errors.longitude.message}</div> : <></>}
          <label for="visibility">Visibility</label>

            <select {...register("visibility", {required: "Coleguita este campo es obligatorio",})} className="form-control"  >
              <option value="1">public</option>
              <option value="2">contacts</option>
              <option value="3">private</option>
            </select>
            {errors.visibility ? <div className="error">{errors.visibility.message}</div> : <></>}
        </form>

        <button onClick={handleSubmit(onSubmit)}>Add post      </button>
        {error ? <div>{error}</div> : <></>}

        <br></br><button
        >
          reset
        </button>

      </div>
    </>
  );
}

