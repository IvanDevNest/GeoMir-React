import React from 'react';
import { UserContext } from '../userContext';
import { useContext } from 'react';
import PostsList from './PostsList';


export default function PostList({post}) {
    let { authToken, setAuthToken } = useContext(UserContext);
    console.log(post);
    return (
      <>
      <td> {post.body}</td>
      <td> {post.longitude} </td>
      <td> {post.latitude} </td>
      <td> {post.likes_count} </td>
      <td> {post.author.name} </td>
      <td> {post.comments_count} </td>

      </>
    )
  }
