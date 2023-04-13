import React from 'react';
import { UserContext } from '../userContext';
import { useContext } from 'react';
import PostsList from './PostsList';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../slices/posts/thunks';



export default function PostList({post , deletePost}) {
    let { authToken, setAuthToken } = useContext(UserContext);
    let { usuari, setUsuari } = useContext(UserContext);
    let navigate = useNavigate();

    

    console.log(post);
    return (
      <>
      <td> {post.body}</td>
      <td> {post.longitude} </td>
      <td> {post.latitude} </td>
      <td> {post.likes_count} </td>
      <td> {post.author.name} </td>
      <td> {post.comments_count} </td>
      <button  onClick={(e) => {navigate("/posts/" + post.id)}}>👁</button>
            {usuari==post.author.email ? <>
                <button onClick={(e) => {navigate("/posts/edit/" + post.id)}} >✏️</button>
            </>:<></>}

      </>
    )
  }
