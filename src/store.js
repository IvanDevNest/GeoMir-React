import { configureStore } from '@reduxjs/toolkit'
import { placeMarksReducer } from './slices/placeMarksSlice'
import placeSlice from './slices/places/placeSlice'
import { postMarkReducer } from './slices/postMarkSlice'
import reviewSlice from './slices/reviews/reviewSlice'
import { todosReducer } from './slices/todoSlice'


export const store = configureStore({
    reducer: {

        todos: todosReducer,
        marks : placeMarksReducer,
        marks2:postMarkReducer,
        reviews: reviewSlice,
        places: placeSlice        
        },
    })