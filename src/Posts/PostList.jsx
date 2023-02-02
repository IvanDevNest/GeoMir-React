import React from 'react';
import { UserContext } from '../userContext';
import { useContext } from 'react';


export default function PostList() {
    let { authToken, setAuthToken } = useContext(UserContext);
    return (
      <div>Post</div>
    )
  }
