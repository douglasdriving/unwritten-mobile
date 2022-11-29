/* authTokenSlice.js */

/*
Reducers:
- loadFromStorage (async)
- fetchWithCredentials (async)
- set
- clear

Selectors:
- token

*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthToken as setTokenForBackendCalls, signIn} from '../backend/backendCalls';

export const loadAuthTokenFromStorage = createAsyncThunk(
  'authToken/loadAuthTokenFromStorage',
  async (arg, thunkAPI) => {
    const tokenInStorage = await AsyncStorage.getItem('authToken');
    return tokenInStorage;
  }
);

export const fetchAuthTokenWithCredentials = createAsyncThunk(
  'user/fetchWithCredentials',
  async({email, password}, thunkAPI) => {
    //uses the creds to retrieve the auth token from the backend and store in redux
    const response = await signIn(email, password);
    if(response.ok){
      return response.token;
    }
    else{
      //login failed! Must be handled in some way...
      return '';
    }
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
      return {...state, token: action.payload};
    },
    clearAuthToken: (state, action) => {
      setTokenForBackendCalls('');
      return {...state, token: ''};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthTokenFromStorage.fulfilled, (state, action) => {
        setTokenForBackendCalls(action.payload); //ok this is confusing, should just keep it here
        state.token = action.payload;
      })
      .addCase(fetchAuthTokenWithCredentials.fulfilled, (state, action) =>{
        setTokenForBackendCalls(action.payload);
        state.token = action.payload;
      })
      //should add actions for pending and rejected here too
  }
});

export const selectAuthToken = state => state.authToken.token;
export const { setAuthToken, clearAuthToken } = authTokenSlice.actions;
export const authTokenReducer = authTokenSlice.reducer;