import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../userContext';
import ReactTimeAgo from 'react-time-ago'
import { useDispatch } from 'react-redux';
import TimeAgo from "react-timeago";
import { useSelector } from 'react-redux';
import { delComment } from '../../slices/comments/thunks';
export const Comment = ({ comment }) => {

  const { usuari, email,setUsuari, authToken, setAuthToken } = useContext(UserContext);
  
  const { comments = [], page=0, isLoading=true, add=true, error="", commentsCount=0 } =
            useSelector((state) => state.comments);

  const dispatch = useDispatch();
  
  
  
// const Comment = ({ comment,id }) => {
//   let { authToken, setAuthToken,usuari, setUsuari ,commentCreado,setCommentCreado,comments, setComments} = useContext(UserContext);
//   let [error, setError] = useState("");
//   const formatter = buildFormatter(spanishStrings);

//   const deleteComment = async (idcomment) => {
//     try {
//       const data = await fetch(("https://backend.insjoaquimmir.cat/api/posts/"+id+"/comments/"+idcomment), {
//         headers: {
//           'Accept': 'application/json',
//           'Authorization': 'Bearer ' + authToken
//         },
//         method: "DELETE",
//       });
//       const resposta = await data.json();
//       if (resposta.success === true) {
//         console.log("comment eliminado")
//         setCommentCreado(false)

//         let filtered = comments.filter( e =>  {
//           return e.id !== comment.id
//         });
//         console.log(filtered)
//         setComments(filtered)
//       }
//       else {
//         console.log(resposta.message)
//         setError(resposta.message);
//       }
//     } catch {
//       console.log("Error");
//       alert("Catchch");
//     };
  
  return (
    <>
      <div class="px-10">
      <div class="bg-white max-w-xl rounded-2xl px-10 py-8  hover:shadow-2xl transition duration-500">
        <div class="mt-4">
          <h1 class="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
            Comment de {comment.user.name}
          </h1>
        
          <p class="mt-4 text-md text-gray-600">{comment.comment}</p>
          <div class="flex justify-between items-center">
            <div class="mt-4 flex items-center space-x-4 py-6">
              <div class="text-sm font-semibold">
                <span class="font-normal">
                <td><ReactTimeAgo date={comment.created_at} locale="es"/></td>
            {usuari==comment.user.email ?
            <button
            onClick={(e) => dispatch( delComment(comment,authToken))}
            type="button"
            class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          >
            Esborrar
          </button>
            :<></>}
                </span>
              </div>
            </div>
            {comment.user.email === email ? (
              <>

                {/* <a href="#" className=" w-max text-cyan-600" onClick={ (e)=> deletePost(comment.id,e) }> Esborrar</a> */}
              </>
            ) : (
              <></>
            )}
            {/* <div class="p-6 bg-yellow-400 rounded-full h-4 w-4 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer">+</div> */}
          </div>
        </div>
      </div>
    </div>
      

    </>
  )
}

export default Comment