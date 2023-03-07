import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostGrid from './PostGrid';
import { useFetch } from '../hooks/useFetch';

const PostsGrid = () => {
  let [posts, setPosts] = useState([]);
  let { authToken, setAuthToken } = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);




  const { data, error, loading, setUrl } = useFetch('https://backend.insjoaquimmir.cat/api/posts', {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + authToken
    },
    method: "GET",
  });

  return (
    <>
      {loading?<h1>loading...</h1>:(data.data).map((post) => (

<div key={post.id}> {<PostGrid post={post} />} </div>

))}
    </>
  )
}

export default PostsGrid
