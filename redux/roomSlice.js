
/*
NOT USED RIGHT NOW! MIGHT BE RELEVANT AgAIN IN THE FUTuRE TO SAVE ROOM INFO GLOBALLY

roomSlice.js
used to store info about the current room
Includes:
- readOnly
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { } from '../backend/backendCalls';

//async reducers


//slice
export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    readOnly: true
  },
  reducers: {
    setReadOnlyOn: (state, action) => {
      // console.log('read only set to true');
      return ({
        readOnly: true
      })
    },
    setReadOnlyOff: (state, action) => {
      // console.log('read only set to false');
      return ({
        readOnly: false
      })
    }
  }
});

//export selectors and reducer
export const selectReadOnly = state => state.room.readOnly;
export const { setReadOnlyOff, setReadOnlyOn } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;