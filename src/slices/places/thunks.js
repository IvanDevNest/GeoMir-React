import { setError, setPlace, setisLoading, setPlaces, setPage, setPages} from "./placeSlice";

// export const getPlaces = (authToken, page = 0) => {
//     return async (dispatch)=>{
//         console.log("Entrado a getPlaces")
//         dispatch(setisLoading(true));
//         const url =

//              page > 0

//                  ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page

//                  : "https://backend.insjoaquimmir.cat/api/places";


//         const headers = {
//             headers: {
//                       Accept: "application/json",
//                       "Content-Type": "application/json",
//                       'Authorization': 'Bearer ' + authToken,
//                     },
//             method: "GET",
//         };
//         //const url = "https://backend.insjoaquimmir.cat/api/places/"
//         const data = await fetch(url,  headers);
//         console.log(data)
//         console.log("data respuesta fetch arriba")

//           const resposta = await data.json();
          
//           if (resposta.success == true) {
//             if (page > 0) {

//                 dispatch(setPlaces(resposta.data.collection));
                
//                 dispatch(setPages(resposta.data.links));
//                 console.log(resposta.data.links);
                
//                 } else {
                
//                 dispatch(setPlaces(resposta.data));
                
//                 }
//         }
//         else {
//             console.log(resposta.message)
//             dispatch(setError(resposta.message));
//         }

//     }
// }
export const getPlaces = (authToken, page = 0) => {

    return async (dispatch, getState) => {
        let url = "";
        const filter = getState().places.filter;
        console.log("entra: "+filter.description,filter.author)

        dispatch(setisLoading(true));
        if (filter.description == ""&&filter.author == "") {
            url =
                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page

                    : "https://backend.insjoaquimmir.cat/api/places";
        }else if (!filter.author == ""&&filter.description == ""){
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&author=" + filter.author

                    : "https://backend.insjoaquimmir.cat/api/places?author=" + filter.author;
        } else if (!filter.author == ""&&!filter.description == ""){
            console.log("entra al bueno")
            url =

            page > 0

                ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&description=" + filter.description+"&author="+ filter.author

                : "https://backend.insjoaquimmir.cat/api/places?description=" + filter.description+"&author=" + filter.author;;
        }
        else if (filter.author == ""&&!filter.description == ""){
            url =

                page > 0

                    ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page + "&description=" + filter.description

                    : "https://backend.insjoaquimmir.cat/api/places?description=" + filter.description;
        }

        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        // const url = "https://backend.insjoaquimmir.cat/api/places"
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            if (page > 0) {
                dispatch(setPlaces(resposta.data.collection));

                dispatch(setPages(resposta.data.links));

                console.log(resposta.data.links);

            } else {

                dispatch(setPlaces(resposta.data));

            }
            // dispatch(setPlaces(resposta.data));
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
        }
    };
}




export const addPlace = (authToken, formData) => {

    return async (dispatch, getState) => {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + authToken
            },
            method: "POST",
            body: formData
          });
    
    
       
        const resposta = await data.json();
        console.log(resposta)
        if (resposta.success == true) {

            console.log("Place Creafo Correctamente");

            // dispatch(setAdd(true));

            // usuari no l'indiquem i per defecta estarà a ""
            // const state = getState()

            // dispatch(setReviewsCount(state.reviewsCount - 1));


        } else {
            // dispatch(setError(resposta.message))
        }

    };

};

export const handleUpdate = (authToken, id, formulari, navigate) => {
    return async (dispatch, getState) => {
        console.log(formulari.name)
        let { name, description, upload, latitude, longitude, visibility = 1 } = formulari;

        console.log(upload)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (upload != undefined) formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);
        console.log(formData)
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
                body: formData
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("place actualizado")
            navigate("/places/" + resposta.data.id)
        } else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }

    };
};


export const delPlace = (id,authToken,navigates) => {

    return async (dispatch, getState) => {


        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();

        console.log(resposta);
        if (resposta.success == true) {
            console.log("place eliminado")
            navigates("/places/list")
        }
        else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }


    };
    // try {
    //   const data = await fetch(("https://backend.insjoaquimmir.cat/api/places/" + id), {
    //     headers: {
    //       'Accept': 'application/json',
    //       'Authorization': 'Bearer ' + authToken
    //     },
    //     method: "DELETE",
    //   });
    //   const resposta = await data.json();
    //   if (resposta.success === true) {
    //     console.log("place eliminado")
    //     navigate("/places/list")
    //   }
    //   else {
    //     console.log(resposta.message)
    //     dispatch(setError(resposta.message));
    //   }
    // } catch {
    //   console.log("Error");
    //   alert("Catchch");
    // };
}
export const getPlace = (authToken,id) => {
    return async (dispatch, getState) => {
        dispatch(setisLoading(true));


        const headers = {
            headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer ' + authToken,
                    },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id
        const data = await fetch(url,  headers  );
        const resposta = await data.json();

        if (resposta.success == true) 
        {
            console.log("fetch realizado con exito")

            dispatch(setPlace(resposta.data));
        }
        else {
            dispatch (setError(resposta.message));
        }


       
};
    // try {
    //   const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       'Authorization': 'Bearer ' + authToken,
    //     },
    //     method: "GET",
    //   });
    //   const resposta = await data.json();
    //   console.log(isLoading)

    //   if (resposta.success === true) {
    //     console.log(resposta)
    //     setPlace(resposta.data)
    //     setLoading(false)
    //     console.log(isLoading)

    //   }
    //   else setError(resposta.message);
    // } catch {
    //   console.log("Error");
    //   alert("Catchch");
    // };

  }