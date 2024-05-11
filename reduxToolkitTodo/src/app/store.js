import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';
//todoReducer: This is the default export from the specified module. In Redux Toolkit, slices automatically generate a 
//reducer function for you, and this function is often exported as the default export from a slice file.

export const store = configureStore({
    reducer: todoReducer
})