import React from 'react'
import { UserContext } from '../userContext';7
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceList = ({ place }) => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let { usuari, setUsuari } = useContext(UserContext);
    let navigate = useNavigate();


    return (
        <>
            <td>{place.name}</td>
            <td>{place.description}</td>
            <td>{place.latitude}</td>
            <td>{place.longitude}</td>
            <td>{place.visibility.name}</td>
            <td>{place.author.name}</td>
            <td>{place.favorites_count}</td>
            <button  onClick={(e) => {navigate("/places/" + place.id)}}>👁</button>
            {usuari==place.author.email ? <>
                <button onClick={(e) => {navigate("/places/edit/" + place.id)}} >✏️</button> <button>🗑️</button>
            </>:<></>}
        </>)
}

export default PlaceList