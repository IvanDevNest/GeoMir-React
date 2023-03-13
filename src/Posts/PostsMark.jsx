import React from 'react'
import { delMark } from '../slices/postMarkSlice'
import { useDispatch } from 'react-redux'

const PostsMark = ({ mark,handleDeleteMark}) => {
  const dispatch = useDispatch();

  return (

    <tr> 
      <td>{mark.body}</td>
      <td><a href={mark.ruta}>{mark.ruta}</a></td>

      <td><button onClick={()=>{dispatch(delMark(mark.id))}  }>🗑️</button></td>
    </tr>

  )
}

export default PostsMark