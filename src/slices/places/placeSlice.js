

import { createSlice } from "@reduxjs/toolkit";
const initialState = {


    isLoading: false,

    error: "",

    places: [],

    place: {

        name: "",
        
        description: "",
        
        file: { filepath: "" },
        
        author: { name: "" },
        
        latitude: 0,
        
        longitude: 0,
        
        visibility:0,
        
        },
        page: 1,


        pages: [], 

}
export const placeSlice = createSlice({

    name: "place",

    initialState,

    reducers: {
        setPlaces:(state, action) =>{
            state.places = action.payload
            state.isLoading = false
            console.log("entrado a setPlaces")

        },

        setisLoading: (state) => {

            //console.log("ABA")

            state.isLoading = true;

        },

        setPlace: (state, action) => {

            state.place = action.payload

            state.isLoading = false
        },

        setreviewCreada: (state, action) => {

            state.reviewCreada = action.payload

        },

        setError: (state, action) => {

            state.error = action.payload

        },

        // setFormulari: (state,action) => {

        // state.formulari = action.payload

        // },
        setReviewsCount: (state, action) => {

            state.reviewsCount = action.payload

        },
        setPage: (state,action) => {
        
            state.page = action.payload
        
        },
        setPages: (state,action) => {

            state.pages = action.payload
            
        },

    }

});

export const { setreviewCreada, setisLoading, setPlace, setPlaces, setAdd, setError, setReviewsCount, setPage, setPages } = placeSlice.actions;

export default placeSlice.reducer