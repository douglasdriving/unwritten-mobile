
/*
roomSlice.js
used to store info about the current room
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//async reducers


//slice
export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    readOnly: true,
    title: '',
    description: '',
    scenarios: []
  },
  reducers: {
    setReadOnlyOn: (state, action) => {
      return ({
        ...state,
        readOnly: true
      })
    },
    setReadOnlyOff: (state, action) => {
      return ({
        ...state,
        readOnly: false
      })
    },
    setStoryContent: (state, action) => {
      return ({
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        scenarios: action.payload.scenarios
      })
    }
  }
});

//export selectors
export const selectReadOnly = state => state.room.readOnly;
export const selectTitle = state => state.room.title;
export const selectDescription = state => state.room.description;
export const selectScenarios = state => state.room.scenarios;
export const selectScenarioCount = state => state.room.scenarios.length;

//export reducers
export const { setReadOnlyOff, setReadOnlyOn, setStoryContent } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;