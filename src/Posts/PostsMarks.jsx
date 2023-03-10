
import React from 'react'
import PostsMark from './PostsMark'
import { postsMarksReducer } from './postsMarksReducer';
import { useReducer } from 'react';
import { useEffect } from 'react';
const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("marks")) || []
  console.log(marks)
}

const PostsMarks = () => {
  const [marks, dispatchMarks] = useReducer(postsMarksReducer, initialState, init);

  const handleDeleteMark = (id) => {
    dispatchMarks({

      type: 'Del Mark',

      payload: id

    })
  }
  console.log(marks)

  return (
    <div>
      <table>
        <tr>
          <th>body</th>
          <th>ruta</th>
          <th>botons</th>

        </tr>

        {marks.map((mark) => (
          <PostsMark key={mark.id} mark={mark} handleDeleteMark={handleDeleteMark} />
        ))}
      </table>

    </div>
  )
}

export default PostsMarks
