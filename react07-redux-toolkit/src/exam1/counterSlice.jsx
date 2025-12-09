import { createSlice } from '@reduxjs/toolkit';
import React from 'react';


const counterSlice = createSlice({
    name: 'mycounter',
    initialState: {myValue: 0},
    reducers: {
        
        increment: (state) =>{
            state.myValue +=1; 
        }, 
        decrement: (state)=> {
            state.myValue -= -1;
        },
        reset: (state)=> {
            state.myValue=0;
        }
    }
});

export const {increment, decrement, reset} = counterSlice.actions;
export default counterSlice.reducer;