import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostGrid from './PostGrid';
import { useFetch } from '../hooks/useFetch';
import { getPosts } from '../slices/posts/thunks';
import Paginate from './Paginate';

const PostsGrid = () => {
  //let [posts, setPosts] = useState([]);
  let { authToken, setAuthToken } = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);



  const { posts, isLoading, page} = useSelector((state) => state.posts);

  const dispatch = useDispatch();


  useEffect(() => {

  dispatch(getPosts(authToken, page));
}, [page]);


 
  return (
    <>
      {loading?<h1>loading...</h1>:(data.data).map((post) => (

<div key={post.id}> {<PostGrid post={post} />} </div>

))}
      <Paginate />
    </>
  )
}

export default PostsGrid
