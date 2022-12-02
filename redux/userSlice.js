/* userSlice.js */
/* used to store info about the logged in user */

/*
Reducers:
- loadLocalToken(async)
- fetchTokenWithCredentials (async)
- createUserAndFetchToken (async)
- login
- logout
 
Selectors:
- name
- id
- premium
- token
- user
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetUser, signUp, setAuthToken, signIn, hasToken } from '../backend/backendCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadLocalToken = createAsyncThunk(
  'user/loadLocalToken',
  async (arg, thunkAPI) => {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  }
);

export const fetchTokenWithCredentials = createAsyncThunk(
  'user/fetchTokenWithCredentials',
  async ({ email, password }, thunkAPI) => {
    const tokenFetch = await signIn(email, password);
    if (tokenFetch.token) await AsyncStorage.setItem('authToken', tokenFetch.token);
    return tokenFetch;
  }
);

export const createUserAndFetchToken = createAsyncThunk(
  'user/createUserAndFetchToken',
  async ({ email, password, displayName, pushToken }, thunkAPI) => {
    const response = await signUp(email, password, displayName, pushToken);
    const token = response.token;
    return token;
  }
)

export const login = createAsyncThunk(
  //uses the auth token to log the user in!
  'user/login',
  async (arg, thunkAPI) => {

    if (!hasToken()) return null;

    const user = await GetUser();

    if (user.id) {
      return user;
    }
    else {
      return null;
    }

  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async (arg, thunkAPI) => {
    await AsyncStorage.setItem('authToken', '');
    return;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    id: null,
    premium: false,
    token: null,
    loginError: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLocalToken.fulfilled, (state, action) => {
        setAuthToken(action.payload);
        return { ...state, token: action.payload };
      })
      .addCase(fetchTokenWithCredentials.fulfilled, (state, action) => {
        setAuthToken(action.payload);
        state.token = action.payload;
        if(!action.payload.ok) state.loginError = action.payload.message;
      })
      .addCase(createUserAndFetchToken.fulfilled, (state, action) => {
        setAuthToken(action.payload);
        state.token = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.name = action.payload.name;
          state.id = action.payload.id;
          state.premium = action.payload.premium;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        setAuthToken(null);
        state.name = null;
        state.id = null;
        state.premium = false;
        state.token = null;
      })

  }
});

export const selectUserName = state => state.user.name;
export const selectUserId = state => state.user.id;
export const selectUserPremium = state => state.user.premium;
export const selectUserToken = state => state.user.token;
export const selectUser = state => state.user;

export const userReducer = userSlice.reducer;