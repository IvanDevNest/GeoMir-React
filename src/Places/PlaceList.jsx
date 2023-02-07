import React from 'react'
import { UserContext } from '../userContext';7
import { useContext } from 'react';

const PlaceList = ({ place }) => {
    let { authToken, setAuthToken } = useContext(UserContext);
    let { usuari, setUsuari } = useContext(UserContext);


    return (
        <>
            <td>{place.name}</td>
            <td>{place.description}</td>
            <td>{place.latitude}</td>
            <td>{place.longitude}</td>
            <td>{place.visibility.name}</td>
            <td>{place.author.name}</td>
            <td>{place.favorites_count}</td>
            <td>👁</td>
            {usuari==place.author.email ? <>
                <button>✏️</button> <button>🗑️</button>
            </>:<></>}
        </>)
}

export default PlaceList