
import React from 'react'
import PostsMark from './PostsMark'
import { postsMarksReducer } from './postsMarksReducer';
import { useReducer } from 'react';
import { useEffect } from 'react';
const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("marks2")) || []
  console.log(marks2)
}

const PostsMarks = () => {
  const [marks2, dispatchMarks] = useReducer(postsMarksReducer, initialState, init);

  const handleDeleteMark = (id) => {
    dispatchMarks({

      type: 'Del Mark',

      payload: id

    })
  }
  console.log(marks2)

  return (
    <div>
      <table>
        <tr>
          <th>body</th>
          <th>ruta</th>
          <th>botons</th>

        </tr>

        {marks2.map((mark) => (
          <PostsMark key={mark.id} mark={mark} handleDeleteMark={handleDeleteMark} />
        ))}
      </table>

    </div>
  )
}

export default PostsMarks
