
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostList from './PostList';




const PostsList = () => {
    let [posts, setPosts] = useState([]);
    let [error, setError] = useState("");
    let { authToken, setAuthToken } = useContext(UserContext);
    let { usuari, setUsuari } = useContext(UserContext);





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
                console.log(resposta.data
                )

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

    const deletePost = async (id) => {
        try {
          const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/"+id), {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            method: "DELETE",
          });
          const resposta = await data.json();
          if (resposta.success === true) {
            console.log("post eliminado")
            setRefresh(!refresh)
          }
          else {
            console.log(resposta.message)
            setError(resposta.message);
          }
        } catch(err) {
          console.log(err.message);
          alert("Catchch");
        };
      }

    return (
        <>
            <div>
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
                { posts.map((post) => (


<tr key={post.id}>
                        {usuari==post.author.email||post.visibility.name=='public'?
                        <PostList post={post}/> :<></>}
                        </tr>
    
))}
            </table>

            </div>

        </>
    )
}

export default PostsList