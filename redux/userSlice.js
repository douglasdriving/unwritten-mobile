/* userSlice.js */
/* used to store info about the logged in user */

/*

Reducers:
- fetchWithToken (async)
- clear
 
Selectors:
- name
- id
- premium

*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetUser } from '../backend/backendCalls';

export const fetchUserWithToken = createAsyncThunk(
  'user/fetchUserWithToken',
  async (arg, thunkAPI) => {
    //assumes there is a token stored in backendCalls.js
    //uses that token to fetch the user info from the database
    const user = await GetUser();
    return user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    id: null,
    premium: false,
    // isLoading: false, // for anims
    // hasError: false
  },
  reducers: {
    clearUser: (state, action) => {
      return {
        name: '',
        id: null,
        premium: false,
        // isLoading: false,
        // hasError: false
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWithToken.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.id = action.payload.id;
        state.premium = action.payload.premium;
        // state.isLoading = false;
        // state.hasError = false;
      })
  }
});

export const selectUserName = state => state.name;
export const selectUserId = state => state.id;
export const selectUserPremium = state => state.premium;
export const selectUser = state => state;

export const { clearUser } = authTokenSlice.actions;
export const authTokenReducer = authTokenSlice.reducer;