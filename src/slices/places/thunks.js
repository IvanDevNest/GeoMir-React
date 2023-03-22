

export const addPlace = (authToken,formData) => {

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

        
    }else{
            // dispatch(setError(resposta.message))
        }

    };
};