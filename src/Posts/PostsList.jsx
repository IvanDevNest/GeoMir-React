
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostList from './PostList';
import { useFetch } from '../hooks/useFetch';




const PostsList = () => {
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
    console.log(data)








    return (
        <>
            {loading ? <h1>loading...</h1> :<div>
                <h1>Posts List</h1>
                <table>
                    <tr>
                      <th>body</th>
                      <th>longitude</th>
                      <th>latitude</th>
                      <th>likes</th>
                      <th>author</th>
                      <th>comentaris</th>

                    </tr>

                    {(data.data).map((post) => (


                        <tr key={post.id}>
                            {usuari == post.author.email || post.visibility.name == 'public' ?
                                <PostList post={post} /> : <></>}
                        </tr>

                    ))}
                </table>

            </div>}

        </>
    )
}

export default PostsList