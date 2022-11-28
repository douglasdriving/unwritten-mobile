/* authTokenSlice.js */

/*
Reducers:
- loadFromStorage (async)
- set
- clear

Selectors:
- token

*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadAuthTokenFromStorage = createAsyncThunk(
  'authToken/loadAuthTokenFromStorage',
  async (arg, thunkAPI) => {
    const tokenInStorage = await AsyncStorage.getItem('authToken');
    return tokenInStorage;
  }
);

export const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    token: '',
    isLoading: false, // if we wanna show some load anim
    hasError: false,
  },
  reducers: {
    setAuthToken: (state, action) => {
      console.log('setting auth token to: ', action.payload);
      return action.payload;
    },
    clearAuthToken: (state, action) => {
      console.log('clearing auth token');
      return '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthTokenFromStorage.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadAuthTokenFromStorage.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadAuthTokenFromStorage.rejected = (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
  }
  // extraReducers: {
  //   [loadAuthTokenFromStorage.pending]: (state, action) => {
  //     state.isLoading = true;
  //     state.hasError = false;
  //   },
  //   [loadAuthTokenFromStorage.fulfilled]: (state, action) => {
  //     state.token = action.payload;
  //     state.isLoading = false;
  //     state.hasError = false;
  //   },
  //   [loadAuthTokenFromStorage.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.hasError = true;
  //   }
  // }
});

export const selectAuthToken = state => state.authToken.token;
export const { setAuthToken, clearAuthToken } = authTokenSlice.actions;
export const authTokenReducer = authTokenSlice.reducer;