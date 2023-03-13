import { configureStore } from '@reduxjs/toolkit'
import { placeMarksReducer } from './slices/placeMarksSlice'
import { todosReducer } from './slices/todoSlice'


export const store = configureStore({
    reducer: {

        todos: todosReducer,
        marks : placeMarksReducer
        
        },
    })