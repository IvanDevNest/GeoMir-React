
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PlaceList from './PlaceList';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPlaces } from '../slices/places/thunks';



const PlacesList = () => {
    // let [places, setPlaces] = useState([]);
    let { authToken, setAuthToken } = useContext(UserContext);
    let { usuari, setUsuari } = useContext(UserContext);
    const { places, isLoading} = useSelector((state) => state.places);

    const dispatch = useDispatch();


    useEffect(() => {

    dispatch(getPlaces(authToken));
}, []);


console.log(places)
console.log("arriba los places")







    return (
        <>
            {isLoading ? <h1>loading...</h1> :<div>
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

                    {(places).map((place) => (


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