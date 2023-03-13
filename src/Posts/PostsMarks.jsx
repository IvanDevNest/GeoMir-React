
import React from 'react'
import PostsMark from './PostsMark'
import { postsMarksReducer } from './postsMarksReducer';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const initialState = [];
const init = () => {
  return JSON.parse(localStorage.getItem("marks2")) || []
  console.log(marks2)
}

const PostsMarks = () => {
  const { marks2 } = useSelector(state => state.marks2)  // const [marks2, dispatchMarks] = useReducer(postsMarksReducer, initialState, init);

  // const handleDeleteMark = (id) => {
  //   dispatchMarks({

  //     type: 'Del Mark',

  //     payload: id

  //   })
  // }
  console.log(marks2)

useEffect(() => {
  localStorage.setItem("marks2", JSON.stringify(marks2));
}, [marks2]);


  return (
    <div>
      <table>
        <tr>
          <th>body</th>
          <th>ruta</th>
          <th>botons</th>

        </tr>

        {marks2.map((mark) => (
          // <PostsMark key={mark.id} mark={mark} handleDeleteMark={handleDeleteMark} />
          <PostsMark key={mark.id} mark={mark}/>

        ))}
      </table>

    </div>
  )
}

export default PostsMarks
