

import { createSlice } from "@reduxjs/toolkit";
const initialState = {

    isLoading: false,

    error: "",

    posts: [],

    post: {
        
        body: "",
        
        file: { filepath: "" },
        
        author: { name: "" },
        
        latitude: 0,
        
        longitude: 0,
        
        visibility:0,
        
        },
        page: 1,

        pages: [], 

}
export const postSlice = createSlice({

    name: "post",

    initialState,

    reducers: {
        setPosts:(state, action) =>{
            state.posts = action.payload
            state.isLoading = false
            console.log("entrado a setPosts")

        },

        setisLoading: (state) => {

            //console.log("ABA")

            state.isLoading = true;

        },

        setPost: (state, action) => {

            state.place = action.payload

            state.isLoading = false
        },

        setcommentCreada: (state, action) => {

            state.commentCreada = action.payload

        },

        setError: (state, action) => {

            state.error = action.payload

        },

        // setFormulari: (state,action) => {

        // state.formulari = action.payload

        // },
        setCommentsCount: (state, action) => {

            state.commentsCount = action.payload

        },
        setPage: (state,action) => {
        
            state.page = action.payload
        
        },
        setPages: (state,action) => {

            state.pages = action.payload
            
        },

    }

});

export const { setcommentCreada, setisLoading, setPost, setPosts, setAdd, setError, setCommentsCount, setPage, setPages } = postSlice.actions;

export default postSlice.reducer