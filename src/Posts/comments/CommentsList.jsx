import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import CommentAdd from './CommentAdd'
import Comment from './Comment'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getComments } from '../../slices/comments/thunks';
import { setCommentsCount } from '../../slices/comments/commentSlice';

export const CommentsList = ({ id, comments_count }) => {

  let { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  
  const dispatch = useDispatch();
  
  const { comments = [], page=0, isLoading=true, add=true, error="", commentsCount=0 } =
  
  useSelector((state) => state.comments);
  
  useEffect(() => {
  
  dispatch(setCommentsCount(comments_count))
  
  dispatch(getComments(0, id, authToken,email));
  
  }, []);

// const CommentsList = () => {
//   let { authToken, setAuthToken, usuari, setUsuari,comments, setComments,refresh,setRefresh,commentCreado,setCommentCreado } = useContext(UserContext);
//   const { id } = useParams();
//   let [error, setError] = useState("");
//   let [loading, setLoading] = useState(true);


//   const getComments = async () => {
//     try {
//       console.log(id)
//       const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments", {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           'Authorization': 'Bearer ' + authToken,
//         },
//         method: "GET",
//       });
//       const resposta = await data.json();
//       if (resposta.success === true) {
//         console.log(resposta)
//         setComments(resposta.data);
//         console.log(resposta.data)
//         console.log(usuari)

//         resposta.data.map((comment) => 
//           {comment.user.email==usuari ?
//         setCommentCreado(true)
//         :
//         setCommentCreado(false)
//         })
//         setLoading(false)


//       }
//       else setError(resposta.message);
//     } catch (err) {
//       console.log(err.message);
//       alert("Catchch");
//     };
//   }
//   useEffect(() => {
//     getComments();
//   }, [refresh]);

  return (
    <>
    {add ? <CommentAdd id={id} /> : <></>}
    <div class="flex mx-auto items-center justify-center  mt-6 mb-4 max-w-lg">
      {commentsCount == 0 ? (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
          No hi ha comments
        </div>
      ) : (
        <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
          Hi ha {commentsCount} {commentsCount > 1 ? " ressenyes" : " ressenya"}{" "}
        </div>
      )}
    </div>

    {error ? (
      <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
        {error}
      </div>
    ) : (
      <></>
    )}

    {comments.map((v) => {
      return <Comment key={v.id} id = {id} comment={v} />;
    })}

</>
  )
}

export default CommentsList