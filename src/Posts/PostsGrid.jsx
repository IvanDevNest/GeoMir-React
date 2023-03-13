import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostGrid from './PostGrid';

const PostsGrid = () => {
  let [posts, setPosts] = useState([]);
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);




  const getPosts = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setPosts(resposta.data);
        console.log(resposta.data)

      }
      else setError(resposta.message);
    } catch {
      console.log("Error");
      alert("Catchch");
    };

  }

  useEffect(() => {
    getPosts();

  }, []);

  return (
    <>
      {posts.map((post) => (

        <div key={post.id}> {<PostGrid post={post} />} </div>

      ))}
    </>
  )
}

export default PostsGrid