import { setError, setPlace, setisLoading, setPlaces } from "./placeSlice";

export const getPlaces = (authToken) => {
    return async (dispatch)=>{
        console.log("Entrado a getPlaces")
        dispatch(setisLoading(true));


        const headers = {
            headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer ' + authToken,
                    },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/"
        const data = await fetch(url,  headers);
        console.log(data)
        console.log("data respuesta fetch arriba")

          const resposta = await data.json();
          if (resposta.success == true) {
            console.log("Places Listados")
            console.log(resposta)
            dispatch(setPlaces(resposta.data))
        }
        else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }

    }
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