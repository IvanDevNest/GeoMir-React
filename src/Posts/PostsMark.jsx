import React from 'react'


const PostsMark = ({ mark,handleDeleteMark}) => {
  return (

    <tr> 
      <td>{mark.body}</td>
      <td><a href={mark.ruta}>{mark.ruta}</a></td>

      <td><button onClick={()=>handleDeleteMark(mark.id)  }>🗑️</button></td>
    </tr>

  )
}

export default PostsMark