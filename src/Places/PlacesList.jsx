
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceList from './PlaceList';




const PlacesList = () => {
    let [places, setPlaces] = useState([]);
    let [error, setError] = useState("");
    let { authToken, setAuthToken } = useContext(UserContext);




    const getPlaces = async () => {
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken,
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                setPlaces(resposta.data);
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
        getPlaces();

    }, []);


    return (
        <>
            <div>
                <h1>Places List</h1>
            <table>
                <tr>
                    <th>name</th>
                    <th>description</th>
                    <th>latitude</th>
                    <th>longitude</th>
                    <th>visibility</th>
                    <th>author</th>
                    <th>favorits</th>

                </tr>
                { places.map((place) => (

                <tr key={place.id}> {<PlaceList place={place}/>} </tr>
                    
                ))}
            </table>

            </div>

        </>
    )
}

export default PlacesList