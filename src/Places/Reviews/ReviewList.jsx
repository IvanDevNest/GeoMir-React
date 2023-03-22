import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../../userContext';
import ReviewAdd from './ReviewAdd'
import Review from './Review'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getReviews } from '../../slices/reviews/thunks';
import { setReviewsCount } from '../../slices/reviews/reviewSlice';

const ReviewList = ({ id, reviews_count }) => {
  let { usuari, email, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(true);

  const { reviews = [], page=0, isLoading=true, add=true, error="", reviewsCount=0 } =

useSelector((state) => state.reviews);

useEffect(() => {

  dispatch(setReviewsCount(reviews_count))
  
  dispatch(getReviews(0, id, authToken,email));
  
  }, []); 


  // const getReviews = async () => {
  //   try {
  //     console.log(id)
  //     const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews", {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Authorization': 'Bearer ' + authToken,
  //       },
  //       method: "GET",
  //     });
  //     const resposta = await data.json();
  //     if (resposta.success === true) {
  //       console.log(resposta)
  //       setReviews(resposta.data);
  //       console.log(resposta.data)
  //       console.log(usuari)

  //       resposta.data.map((review) => 
  //         {review.user.email==usuari ?
  //       setReviewCreada(true)
  //       :
  //       setReviewCreada(false)
  //       })
  //       setLoading(false)


  //     }
  //     else setError(resposta.message);
  //   } catch (err) {
  //     console.log(err.message);
  //     alert("Catchch");
  //   };
  // }
  // useEffect(() => {
  //   getReviews();
  // }, [refresh]);

  return (
    
    <>
      {add ? <ReviewAdd id={id} /> : <></>}
      <div class="flex mx-auto items-center justify-center  mt-6 mb-4 max-w-lg">
        {reviewsCount == 0 ? (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200">
            No hi ha reviews
          </div>
        ) : (
          <div className="flex mb-4 w-full items-center space-x-2 rounded-2xl bg-blue-50 px-4 ring-2 ring-blue-200">
            Hi ha {reviewsCount} {reviewsCount > 1 ? " ressenyes" : " ressenya"}{" "}
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

      {reviews.map((v) => {
        return <Review key={v.id} id = {id} review={v} />;
      })}

</>
  )
}

export default ReviewList