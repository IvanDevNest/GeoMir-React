import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { useNavigate } from "react-router-dom";
// import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { addComment } from '../../slices/comments/thunks';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";


const CommentAdd = () => {
 
  let [formulari, setFormulari] = useState({});
  const { id } = useParams();
  let { authToken, setAuthToken,usuari, setUsuari} = useContext(UserContext);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  // const { comments = [], page = 0, isLoading = true, setAdd = false, error = "", commentsCount = 0 } = useSelector((state) => state.comments);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => dispatch(addComment(authToken,data,id));

  // const { formState, onInputChange, onResetChange } = useForm({

  //   comment: "",
    
    
  //   });
    
  //   const {comment} = formState
    // const formData = new FormData;

    // formData.append("comment", comment);
// const CommentAdd = () => {
//   let { authToken, setAuthToken,usuari, setUsuari ,comments, setComments,refresh,setRefresh} = useContext(UserContext);
//   let [formulari, setFormulari] = useState({});
//   const { id } = useParams();
//   let [error, setError] = useState("");

//   let { comment } = formulari;
//   const formData = new FormData;
//   formData.append("comment", comment);

//   const handleChange = (e) => {
//     e.preventDefault();
//     setFormulari({
//       ...formulari,
//       [e.target.name]: e.target.value
//     })
//   }

  

// const createComment = async (e) => {
//   e.preventDefault();
//   try {
//     console.log("Id del post en comment add:" + id)
//     const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id + "/comments", {
//       headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Bearer ' + authToken
//       },
//       method: "POST",
//       body: formData
//     });
//     const resposta = await data.json();
//     if (resposta.success === true) {
//       console.log("comment añadido")
//       setFormulari({
//         ...formulari,
//       comment: "",})
//       setError("")
//       setRefresh(!refresh)  
//   }
//     else {
//       console.log(resposta.message)
//       setError(resposta.message);
//     }
//   } catch {
//     console.log("Error");
//     alert("Catchch");
//   };
// }
return (
  <div>
  <label for="comment">Comment</label>
  <textarea className="form-control" {...register("comment", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 20,
                      message: "El comentario tiene que tener mínimo 20 caracteres y tres palabras"
                    },
                    maxLength: {
                      value: 200,
                      message: "El comentario tiene que tener máximo 200 caracteres"
                    },
                    pattern: {
                      value: /^(?=(\b\w+\b\s?){3,})(?!\s).+$/,
                      message: "El comentario tiene que contener mínimo 3 palabras" 
                    }})} ></textarea>
  
  <button onClick={handleSubmit(onSubmit)}
 className="btn btn-primary" 
  >Add Comment</button>
 
  {errors.comment? (<div>{errors.comment.message}</div>):(<></>) }       

  
</div>
)
}

export default CommentAdd