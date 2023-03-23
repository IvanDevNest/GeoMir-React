import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../userContext";
import ReviewList from './Reviews/ReviewList';
import { useDispatch, useSelector } from 'react-redux';
import { addMark, ismarked } from '../slices/placeMarksSlice';
import { delPlace } from '../slices/places/thunks'; 

// const initialState = [];




const Place = () => {
  let [isLoading, setLoading] = useState(true)
  let { authToken, setAuthToken } = useContext(UserContext);
  let [place, setPlace] = useState([]);
  let { usuari, setUsuari } = useContext(UserContext);
  let navigate = useNavigate();

  // const init = () =>{
  //   return JSON.parse(localStorage.getItem("marks")) || []
  // }
  // const [marks, dispatchMark] = useReducer(placesMarksReducer, initialState, init);
  const { marks, isMarked } = useSelector((state) => state.marks);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks))
  }, [marks])

  console.log(marks)

  const { pathname } = useLocation()

  const { id } = useParams();
  const getPlace = async () => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      console.log(isLoading)

      if (resposta.success === true) {
        console.log(resposta)
        setPlace(resposta.data)
        setLoading(false)
        console.log(isLoading)

      }
      else setError(resposta.message);
    } catch {
      console.log("Error");
      alert("Catchch");
    };

  }
  useEffect(() => {
    getPlace();
    dispatch(ismarked(id))

  }, [marks]);
  // const deletePlace = async (id) => {
  //   try {
  //     const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id), {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': 'Bearer ' + authToken
  //       },
  //       method: "DELETE",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log("place eliminado")
  //       navigate("/places/list")
  //     }
  //     else {
  //       console.log(resposta.message)
  //       setError(resposta.message);
  //     }
  //   } catch {
  //     console.log("Error");
  //     alert("Catchch");
  //   };
  // }
  // const addMark = () => {


  const data = {
    "id": place.id,
    "name": place.name,
    "description": place.description,
    "ruta": pathname

  }
  const action = {
    type: "Save Mark",
    payload: data
  }

  // dispatchMark(action);


  // }


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