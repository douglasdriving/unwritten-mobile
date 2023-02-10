
/*
roomSlice.js
used to store info about the current room
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetCampData } from '../backend/backendCalls';

const initialState = {
  id: null,
  title: '',
  description: '',
  creator_id: null,
  readOnly: true,
  created_at: null,
  players: [],
  scenarios: [],
  prompt: null,
  lastNode: null,
};

//async reducers
export const loadRoomData = createAsyncThunk(
  'room/loadRoomData',
  async (arg, thunkAPI) => {

    if (!arg.id) {
      console.error('no room id passed into load room data thunk');
      return;
    }

    const data = await GetCampData(arg.id);

    if (!data) {
      console.error('Failed to get the camp data from the backend!');
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
    resetRoom: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRoomData.fulfilled, (state, action) => {

        const room = action.payload;

        let prompt;
        if (room.lastNode.finished_at) prompt = null;
        else prompt = room.lastNode.prompt || null;

        return {
          id: room.id,
          title: room.title,
          description: room.description,
          creator_id: room.creator_id,
          readOnly: room.finished,
          created_at: room.created_at,
          players: room.players,
          scenarios: room.scenarios,
          prompt: prompt,
          lastNode: room.lastNode,
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
export const selectPrompt = state => state.room.prompt;
export const selectLastNode = state => state.room.lastNode;
export const selectLastFinishedScenario = state => state.room.scenarios[state.room.scenarios.length - 1];

//player selectors
export const selectPlayerCount = state => state.room.players.length;
export const selectAllPlayers = state => state.room.players;
// export const selectActivePlayers = state => state.room.players.filter(player => player.active);
// export const selectActivePlayerCount = state => state.room.players.filter(player => player.active).length;
// export const selectNextPlayer = state => {

//   const nextPlayer = state.room.players.filter(player => (player.id == state.room.nextPlayerId));
//   if (nextPlayer.length > 0) return nextPlayer[0];
//   else return null;

// }

//actions
export const {
  resetRoom,
} = roomSlice.actions;

//reducer
export const roomReducer = roomSlice.reducer;