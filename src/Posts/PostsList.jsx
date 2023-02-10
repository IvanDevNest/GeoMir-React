
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


    return (
        <>
            <div>
                <h1>Places List</h1>
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

                <tr key={post.id}> {<PostList post={post}/>} </tr>
                    
                ))}
            </table>

            </div>

        </>
    )
}

export default PostsList