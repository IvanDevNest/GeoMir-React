import React from 'react'
import { UserContext } from '../userContext';
import { useContext } from 'react';

const PostGrid = ({post}) => {
  
  return (
    <>
          <div class="pink container">
            <div class="red"><img src={"https://backend.insjoaquimmir.cat/storage/" + post.file.filepath} width="400px" height="400px" alt="{place.name}"></img></div>
            <div class="blue">{post.body}</div>
            


          </div>
    </>

  )
}

export default PostGrid