import React from 'react'
import { useDispatch } from 'react-redux'
import { delMark } from '../slices/placeMarksSlice'


const PlacesMark = ({ mark }) => {
  const dispatch = useDispatch();
  return (

    <tr> 
      <td>{mark.name}</td>
      <td>{mark.description}</td>
      <td><a href={mark.ruta}>{mark.ruta}</a></td>

      <td><button onClick={() => {dispatch(delMark(mark.id))}}>Borrar</button></td>
    </tr>

  )
}

export default PlacesMark