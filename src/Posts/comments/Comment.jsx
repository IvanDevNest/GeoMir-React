import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../userContext';
import TimeAgo from 'react-timeago'
import spanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const Comment = ({ comment,id }) => {
  let { authToken, setAuthToken,usuari, setUsuari ,commentCreado,setCommentCreado,comments, setComments} = useContext(UserContext);
  let [error, setError] = useState("");
  const formatter = buildFormatter(spanishStrings);

  const deleteComment = async (idcomment) => {
    try {
      const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments/"+idcomment), {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "DELETE",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log("comment eliminado")
        setCommentCreado(false)

        let filtered = comments.filter( e =>  {
          return e.id !== comment.id
        });
        console.log(filtered)
        setComments(filtered)
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);
      }
    } catch {
      console.log("Error");
      alert("Catchch");
    };
  }
  return (
    <>
      <table class="table">
        <tbody>
          <tr>
            <td class="bold">C de {comment.user.name}</td>
          </tr>
          <tr>
            <td>{comment.comment}</td>
          </tr>
          <tr>
            <td><TimeAgo date={comment.created_at} formatter={formatter}/></td>
            {usuari==comment.user.email ?
            <button onClick={(e) => { deleteComment(comment.id) }}>🗑️</button>
            :<></>}
          </tr>
        </tbody>
      </table>
      

    </>
  )
}

export default Comment