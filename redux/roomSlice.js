
/*
roomSlice.js
used to store info about the current room
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetRoomData } from '../backend/backendCalls';

const initialState = {
  id: null,
  readOnly: true,
  title: '',
  description: '',
  scenarios: [],
  players: [],
  nextPlayerId: null,
};

//async reducers
export const loadRoomData = createAsyncThunk(
  'room/loadRoomData',
  async (arg, thunkAPI) => {

    if (!arg.id) {
      console.error('no room id passed into load room data thunk');
      return;
    }

    const data = await GetRoomData(arg.id);

    if (!data) {
      console.error('Failed to get the room data from the backend!');
      return;
    }

    return data;

  }
)

//slice
export const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    setRoomId: (state, action) => {
      return {
        ...state,
        id: action.payload
      }
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRoomData.fulfilled, (state, action) => {
        //return the state with ALL the extracted data
        const room = action.payload;
        return {
          id: room.id,
          readOnly: room.finished,
          title: room.title,
          description: room.description,
          scenarios: room.scenarios,
          players: room.players,
          nextPlayerId: null,
        };
      })
  }
});

//selectors
export const selectRoomId = state => state.room.id;
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
export const {
  setReadOnlyOff,
  setReadOnlyOn,
  setStoryContent,
  setPlayers,
  setNextPlayerId,
  resetRoom,
  setRoomId
} = roomSlice.actions;

//reducer
export const roomReducer = roomSlice.reducer;