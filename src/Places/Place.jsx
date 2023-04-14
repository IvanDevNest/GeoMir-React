import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../userContext";
import ReviewList from './Reviews/ReviewList';
import { useDispatch, useSelector } from 'react-redux';
import { addMark, ismarked } from '../slices/placeMarksSlice';
import { delPlace } from '../slices/places/thunks'; 
import { getPlace } from '../slices/places/thunks';

/**
 * Componente que muestra información de un place
 * @function
 */
const Place = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let { usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();

  const { marks, isMarked } = useSelector((state) => state.marks);
  const { place, isLoading} = useSelector((state) => state.places);

  /**
   * Almacena los marcadores en el local storage
   * @function
   * @param {Object} marks - Lista de marcadores
   */
  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  const { pathname } = useLocation();

  const { id } = useParams();

  const dispatch = useDispatch();

  /**
   * Obtiene la información del place y verifica si está marcado
   * @function
   * @param {string} authToken - Token de autenticación
   * @param {string} id - Identificador del place
   */
  useEffect(() => {
    dispatch(getPlace(authToken, id));
    dispatch(ismarked(id));
  }, [marks]);

  const data = {
    "id": place.id,
    "name": place.name,
    "description": place.description,
    "ruta": pathname
  };

  const action = {
    type: "Save Mark",
    payload: data
  };


  return (
    <>

      {isLoading ? "cargando..." : <>
        <table>
          <img class="img-fluid" src={"https://backend.insjoaquimmir.cat/storage/" + place.file.filepath} title="Image preview" width="300px" />

          <tr>
            <td>ID</td>
            <td>{place.id}</td>
          </tr>
          <tr>
            <td>Nombre</td>
            <td>{place.name}</td>


          </tr>

          <tr>
            <td>Autor</td>
            <td>{place.author.name}</td>

          </tr>
          <tr>
            <td>Descripcio</td>
            <td>{place.description}</td>

          </tr>
        </table>
        {usuari == place.author.email ?
          <>
            <button onClick={(e) => { navigate("/places/edit/" + place.id) }}>📝</button>
            <button onClick={() => {dispatch(delPlace(place.id,authToken,navigate))}}>🗑️</button>
          </>
          : <></>}
        {isMarked ?
          <button>DESAT</button>
          :
          <button onClick={() => {
            dispatch(addMark(data))
          }}>DESA</button>
        }
        <ReviewList id={place.id}/> 
      </>
      }              

    </>
  )
}

export default Place