
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceList from './PlaceList';
import { useFetch } from '../hooks/useFetch';




const PlacesList = () => {
    let [places, setPlaces] = useState([]);
    let { authToken, setAuthToken } = useContext(UserContext);
    let { usuari, setUsuari } = useContext(UserContext);




    const { data, error, loading, setUrl } = useFetch('https://backend.insjoaquimmir.cat/api/places', {
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

                    {(data.data).map((place) => (


                        <tr key={place.id}>
                            {usuari == place.author.email || place.visibility.name == 'public' ?
                                <PlaceList place={place} /> : <></>}
                        </tr>

                    ))}
                </table>

            </div>}

        </>
    )
}

export default PlacesList