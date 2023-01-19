
/*
roomSlice.js
used to store info about the current room
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  readOnly: true,
  title: '',
  description: '',
  scenarios: [],
  players: [],
  nextPlayerId: null,
};

//async reducers


//slice
export const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
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
    },
    setPlayers: (state, action) => {
      return ({
        ...state,
        players: action.payload
      })
    },
    setNextPlayerId: (state, action) => {
      return ({
        ...state,
        nextPlayerId: action.payload
      })
    },
    resetRoom: () => initialState
  }
});

//selectors
export const selectReadOnly = state => state.room.readOnly;
export const selectTitle = state => state.room.title;
export const selectDescription = state => state.room.description;
export const selectScenarios = state => state.room.scenarios;
export const selectScenarioCount = state => state.room.scenarios.length;

//player selectors
export const selectPlayerCount = state => state.room.players.length;
export const selectAllPlayers = state => state.room.players;
export const selectActivePlayers = state => state.room.players.filter(player => player.active);
export const selectActivePlayerCount = state => state.room.players.filter(player => player.active).length;
export const selectNextPlayer = state => {

  const nextPlayer = state.room.players.filter(player => (player.id == state.room.nextPlayerId));
  if (nextPlayer.length > 0) return nextPlayer[0];
  else return null;

}

//actions
export const { setReadOnlyOff, setReadOnlyOn, setStoryContent, setPlayers, setNextPlayerId, resetRoom } = roomSlice.actions;

//reducer
export const roomReducer = roomSlice.reducer;