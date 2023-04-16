import { setisLoading, setError, setPost, setLike, setPosts,setPages,setPage } from "./postSlice"

export const addPost = (formData, authToken, navigate) => {

    return async (dispatch, getState) => {
        dispatch(setisLoading(true))

        // dispatch(startLoadingComments());
        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: formData
        };

        const url = "https://backend.insjoaquimmir.cat/api/posts"

        const data = await fetch(url, headers);

        const resposta = await data.json();
        console.log("hola");

        if (resposta.success == true) {
            console.log("post creado: " + resposta.data)
            dispatch(setisLoading(false))

            // dispatch(setPosts(resposta.data));
            navigate("/posts/" + resposta.data.id)

        }

        else {
            console.log(resposta)
            dispatch(setError(resposta.message));

        }
    };

}
export const getPost = (authToken, id) => {
    return async (dispatch, getState) => {
        dispatch(setisLoading(true));
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/posts/" + id
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            dispatch(setPost(resposta.data));
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
        }
    };
}
export const delPost = (authToken, navigate, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("post eliminado");
            navigate("/posts/list")
        } else {
            dispatch(setError(resposta.message));
        }

    };
};
export const comprovarLike = (authToken, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("like del principio ")
            console.log("Resposta:" + resposta)
            console.log(id)
            dispatch(eliminarLike(authToken, id))
        } else {
            dispatch(setLike(false))
            dispatch(setError(resposta.message));
        }

    };
};
export const darLike = (authToken, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("like añadido")
            dispatch(setFavorite(false))
        } else {
            dispatch(setError(resposta.message));
        }

    };
};
export const eliminarLike = (authToken, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id + "/likes",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            dispatch(setLike(true))
            console.log("like eliminado")
        } else {
            dispatch(setError(resposta.message));
        }

    };
};

export const handleUpdate = (authToken, id, formulari, navigate) => {
    return async (dispatch, getState) => {
        console.log(formulari.name)
        let { body, upload, latitude, longitude, visibility = 1 } = formulari;

        console.log(upload)
        const formData = new FormData();
        formData.append("body", body);
        if (upload != undefined) formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);
        console.log(formData)
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/posts/" + id,
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
            console.log("post actualizado")
            navigate("/posts/" + resposta.data.id)
        } else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }

    };
};
export const getPosts = (authToken, page = 0) => {
    return async (dispatch,getState)=>{
        let filter = getState().posts.filter;
        console.log("Entrado a getPosts")
        console.log(filter)
        dispatch(setisLoading(true));
        let url = page > 0
        ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page
        : "https://backend.insjoaquimmir.cat/api/posts";
        let simbolo= page > 0 ? "&" : "?";
        let body = filter.body != "" ? "body="+filter.body : "";
        let author = filter.author != "" ? "author="+filter.author : "";
        if (body != "" && author != ""){
            url = url+simbolo+body+"&"+author;
        }else if (author != ""){
            url = url+simbolo+author;
        }else if (body != "" ){
            url = url+simbolo+body;
        }

        const headers = {
            headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer ' + authToken,
                    },
            method: "GET",
        };
        
        const data = await fetch(url,  headers);
        console.log(data)
        console.log("data respuesta fetch arriba")

          const resposta = await data.json();
          
          if (resposta.success == true) {
            if (page > 0) {

                dispatch(setPosts(resposta.data.collection));
                
                dispatch(setPages(resposta.data.links));
                console.log(resposta.data.links);
                
                } else {
                
                dispatch(setPosts(resposta.data));
                
                }
        }
        else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }

    }
}

