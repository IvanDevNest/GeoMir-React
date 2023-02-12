import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useEffect } from 'react';
import { useState } from 'react';
import PostsGrid from './PostsGrid';


const Post = () => {
  let [isLoading, setLoading] = useState(true)
  let { authToken, setAuthToken } = useContext(UserContext);
  let [post, setPost] = useState([]);

  const { id } = useParams();
  const getPost = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
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
        setPost(resposta.data)
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
    getPost();

  }, []);


  return (
    <>

      {isLoading ? "cargando..." : <>
        <table>
          <tr>
            <td>ID</td>
            <td>{post.id}</td>
          </tr>
          <tr>
            <td>Nombre</td>
            <td>{post.name}</td>


          </tr>

          <tr>
            <td>Autor</td>
            <td>{post.author.name}</td>

          </tr>
          <tr>
            <td>Descripcio</td>
            <td>{post.description}</td>

          </tr>
        </table>

      </>
      }

    </>
  )
}

export default Post