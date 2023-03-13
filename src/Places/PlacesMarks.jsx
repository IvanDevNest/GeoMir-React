

import React from 'react'
import PlacesMark from './PlacesMark'
import { placesMarksReducer } from './placesMarksReducer';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// const initialState = [];
// const init = () => {
//   return JSON.parse(localStorage.getItem("marks")) || []
//   console.log(marks)
// }

const PlacesMarks = () => {
  const { marks } = useSelector(state => state.marks)
  // const [marks, dispatchMarks] = useReducer(placesMarksReducer, initialState, init);

  // const handleDeleteMark = (id) => {
  //   dispatchMarks({

  //     type: 'Del Mark',

  //     payload: id

  //   })
  // }
  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);
  console.log(marks)

  return (
    <div>
      <table>
        <tr>
          <th>nombre</th>
          <th>descripcion</th>
          <th>ruta</th>
          <th>botons</th>

        </tr>

        {marks.map((mark) => (
          <PlacesMark key={mark.id} mark={mark}/>
        ))}
      </table>

    </div>
  )
}

export default PlacesMarks
