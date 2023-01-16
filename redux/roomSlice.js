/*
roomSlice.js
used to store info about the current room
Includes:
- turnDeadline
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { } from '../backend/backendCalls';

//async reducers


//slice
export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    turnDeadline: null
  },
  reducers: { //add each reducers
    setTurnDeadline: (state, action) => {
      console.log('turn deadline set to: ', action.payload);
      return ({
        turnDeadline: action.payload
      })
    }
  }
});

//export selectors and reducer
export const selectTurnDeadline = state => state.room.turnDeadline;
export const { setTurnDeadline } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;