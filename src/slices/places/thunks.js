import { setError } from "./placeSlice";




export const addPlace = (authToken, formData) => {

    return async (dispatch, getState) => {

        const data = await fetch(

            "https://backend.insjoaquimmir.cat/api/places/",

            {

                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + authToken
                },
                method: "POST",
                body: formData

            }

        );

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