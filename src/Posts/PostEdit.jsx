import React, { useEffect } from 'react'
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getPost } from '../slices/posts/thunks';
import { handleUpdate } from '../slices/posts/thunks';
import { useDispatch, useSelector } from 'react-redux';

const PostEdit = () => {
  let navigate = useNavigate();
  let [formulari, setFormulari] = useState({});
  let { authToken, setAuthToken } = useContext(UserContext);
  const { id } = useParams();
  let [loading, setLoading] = useState(true);
  

  const dispatch = useDispatch()
  const { post, page=0, error="" } = useSelector((state) => state.posts);
  
  // const getPost = async () => {
  //   try {
  //     console.log(id)
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/" + id), {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Authorization': 'Bearer ' + authToken,
  //       },
  //       method: "GET",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log(resposta);
  //       setLoading(false);
  //       setPost(resposta.data);
  //       setFormulari({name:resposta.data.name,
  //         description:resposta.data.description,
  //         upload:"",
  //         latitude:resposta.data.latitude,
  //         longitude:resposta.data.longitude,
  //         visibility:resposta.data.visibility.id})
  //     }
  //     else {
  //       setError(resposta.message);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catchch");
  //   };

  // }
  useEffect(()=>{
    dispatch(getPost(authToken, id));
  }, [])

  useEffect (()=> {
    console.log(post)
    setFormulari({
      body: post.body,
      upload: post.file,
      longitude: post.longitude,
      latitude: post.latitude,
      visibility: post.visibility.id
    })
  },[post])

  const handleChange = (e) => {
    e.preventDefault();
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
  };
  // let { body, upload, latitude, longitude, visibility = 1} = formulari;
  // const formData = new FormData;
  // formData.append("body", body);
  // formData.append("upload", upload);
  // formData.append("latitude", latitude);
  // formData.append("longitude", longitude);
  // formData.append("visibility", visibility);
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/"+id), {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "POST",
  //       body: formData
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("post actualizado")
  //       navigate("/posts/"+resposta.data.id)
  //     }
  //     else {
  //       console.log(resposta.message)
  //       setError(resposta.message);
  //     }
  //   } catch {
  //     console.log("Error");
  //     alert("Catchch");
  //   };
  // }
  

  return (
    <>
    <div class="login-form">
        <h1>Editar Post</h1>

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
          <label for="visibility">Visibilidad</label><br></br>
          <select name="visibility" value={formulari.visibility} onChange={handleChange} className="form-control"  >
              <option value="1">public</option>
              <option value="2">contacts</option>
              <option value="3">private</option>
            </select>
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
  )
}

export default PostEdit