import { configureStore } from '@reduxjs/toolkit'
import { placeMarksReducer } from './slices/placeMarksSlice'
import { postMarkReducer } from './slices/postMarkSlice'
import { todosReducer } from './slices/todoSlice'


export const store = configureStore({
    reducer: {

        todos: todosReducer,
        marks : placeMarksReducer,
        marks2:postMarkReducer
        
        },
    })