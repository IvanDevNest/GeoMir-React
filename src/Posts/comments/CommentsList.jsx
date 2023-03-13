import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import CommentAdd from './CommentAdd'
import Comment from './Comment'

const CommentsList = () => {
  let { authToken, setAuthToken, usuari, setUsuari,comments, setComments,refresh,setRefresh,commentCreado,setCommentCreado } = useContext(UserContext);
  const { id } = useParams();
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(true);


  const getComments = async () => {
    try {
      console.log(id)
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + authToken,
        },
        method: "GET",
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log(resposta)
        setComments(resposta.data);
        console.log(resposta.data)
        console.log(usuari)

        resposta.data.map((comment) => 
          {comment.user.email==usuari ?
        setCommentCreado(true)
        :
        setCommentCreado(false)
        })
        setLoading(false)


      }
      else setError(resposta.message);
    } catch (err) {
      console.log(err.message);
      alert("Catchch");
    };
  }
  useEffect(() => {
    getComments();
  }, [refresh]);

  return (
    <>
    {commentCreado ?
    <></>:
      <CommentAdd />}
    
      <div>{comments.length>0?
       <div class="card">Hay {comments.length} comment</div>
       : <div class="card">No hay comments</div>
        }
       
        {comments.map((comment) => (
                <div class="card" key={comment.id}>
                  {console.log(id)}
                  <Comment comment={comment} id={id}/>
                </div>
        ))}
      </div>
    </>
  )
}

export default CommentsList