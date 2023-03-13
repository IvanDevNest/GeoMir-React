import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { useNavigate } from "react-router-dom";
import { useForm } from '../../hooks/useForm';

const ReviewAdd = () => {
  let { authToken, setAuthToken,usuari, setUsuari ,reviews, setReviews,refresh,setRefresh,} = useContext(UserContext);
  let [formulari, setFormulari] = useState({});
  const { id } = useParams();
  let navigate = useNavigate();
  let [error, setError] = useState("");
  const formData = new FormData;

  const { formState, onInputChange, onResetChange } = useForm({

    review: "",
    
    
    });
    
    const {review} = formState

const createReview = async (e) => {
  e.preventDefault();
  try {
    console.log("Id del place en review add:" + id)
    const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      method: "POST",
      body: JSON.stringify({review}),
    });
    const resposta = await data.json();
    if (resposta.success === true) {
      console.log("reseña añadida")
      setFormulari({
        ...formulari,
      review: "",})
      setError("")
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
  <div>
    <label for="review">Review</label>
    <textarea name="review" value={review} onChange={onInputChange} className="form-control" required></textarea>
    
    <button className="btn btn-primary" onClick={(e) => {
      createReview(e);
    }}>Add Review</button>
   
    {error? (<div>{error}</div>):(<></>) }       

    
  </div>
)
}

export default ReviewAdd