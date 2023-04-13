

import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    posts: [],

    isLoading: false,

    error: "",

    formulari: [],

    postCreada: false,


}
export const postSlice = createSlice({

    name: "post",

    initialState,

    reducers: {

        startLoadingPosts: (state) => {

            //console.log("ABA")

            state.isLoading = true;

        },

        setPosts: (state, action) => {

            state.posts = action.payload

            state.isLoading = false
        },

        setpostCreada: (state, action) => {

            state.postCreada = action.payload

        },

        setError: (state, action) => {

            state.error = action.payload

        },

        // setFormulari: (state,action) => {

        // state.formulari = action.payload

        // },
        setPostsCount: (state, action) => {

            state.postsCount = action.payload

        }

    }

});

export const { setpostCreada, startLoadingPosts, setPosts, setAdd, setError, setPostsCount } = postSlice.actions;

export default postSlice.reducer