import { configureStore } from '@reduxjs/toolkit'
import { postMarkReducer } from './slices/postMarkSlice'
import { todosReducer } from './slices/todoSlice'


export const store = configureStore({
    reducer: {

        todos: todosReducer,
        marks2:postMarkReducer
        
        },
    })