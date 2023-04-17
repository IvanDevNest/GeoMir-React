import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addReview } from '../../slices/reviews/thunks';

// import { useForm } from '../../hooks/useForm';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';

const ReviewAdd = () => {
  // let { authToken, setAuthToken,usuari, setUsuari ,reviews, setReviews,refresh,setRefresh,} = useContext(UserContext);
  let { authToken, setAuthToken, usuari, setUsuari } = useContext(UserContext); 
  // let [formulari, setFormulari] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit, reset,formState: { errors } } = useForm();
  const { reviews = [], page = 0, isLoading = true, reviewCreada = false, error = "", reviewsCount = 0 } = useSelector((state) => state.reviews);
  // let navigate = useNavigate();
  // let [error, setError] = useState("");
  // const formData = new FormData;

  // const { formState, onInputChange, onResetChange } = useForm({

  //   review: "",
    
    
  //   });
    
  //   const {review} = formState
  const onSubmit = data => dispatch(addReview(authToken, data, id));
// const createReview = async (e) => {
//   e.preventDefault();
//   try {
//     console.log("Id del place en review add:" + id)
//     const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews", {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + authToken
//       },
//       method: "POST",
//       body: JSON.stringify({review}),
//     });
//     const resposta = await data.json();
//     if (resposta.success === true) {
//       console.log("reseña añadida")
//       setFormulari({
//         ...formulari,
//       review: "",})
//       setError("")
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
    <label for="review">Reviews</label>
    <textarea {...register("review", {
          required: "Aquest camp és obligatori",
          minLength: {

            value: 20,

            message: "La review ha de tenir al menys 20 caràcters"

          },

          maxLength: {

            value: 200,

            message: "La review pot tenir com a màxim 200 caràcters"

          },

          pattern: {

            value: /^\S+(?:\s+\S+){2,}$/,

            message:

              "Has d'escriure minim tres paraules"

          }
        
        })}
    //name="review" value={review} onChange={onInputChange} 
    className="form-control" 
    //required
    ></textarea>
            {errors.review && <p>{errors.review.message}</p>}
    
    <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Add Review</button>
        
    {error? (<div>{error}</div>):(<></>) }       

    
  </div>
)
}

export default ReviewAdd