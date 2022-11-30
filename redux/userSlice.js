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

export const loadLocalToken = createAsyncThunk(
  'user/loadLocalToken',
  async (arg, thunkAPI) => {
    const token = await AsyncStorage.getItem('authToken');
    setAuthToken(token);
    return token;
  }
);

export const fetchTokenWithCredentials = createAsyncThunk(
  'user/fetchTokenWithCredentials',
  async ({ email, password }, thunkAPI) => {
    const tokenFetch = await signIn(email, password);
    const token = tokenFetch.token;
    setAuthToken(token); //should not be needed later
    return token;
  }
);

export const createUserAndFetchToken = createAsyncThunk(
  'user/createUserAndFetchToken',
  async ({ email, password, displayName, pushToken }, thunkAPI) => {
    const response = await signUp(email, password, displayName, pushToken);
    const token = response.token;
    setAuthToken(token); //should not be needed later
    return token;
  }
)

//use token to login
export const login = createAsyncThunk(
  //uses the auth token to log the user in!
  'user/login',
  async (arg, thunkAPI) => {

    if (!hasToken) return null;

    const user = await GetUser();

    if (user.id) {
      return user;
    }
    else {
      return null;
    }

  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    id: null,
    premium: false,
    token: null
  },
  reducers: {
    logout: (state, action) => {
      setAuthToken(null); //should not be needed
      return {
        name: null,
        id: null,
        premium: false,
        token: null
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLocalToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fetchTokenWithCredentials.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(createUserAndFetchToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload){
          state.name = action.payload.name;
          state.id = action.payload.id;
          state.premium = action.payload.premium;
        }
      })
  }
});

export const selectUserName = state => state.name;
export const selectUserId = state => state.id;
export const selectUserPremium = state => state.premium;
export const selectUserToken = state => state.token;
export const selectUser = state => state;

export const { logout } = authTokenSlice.actions;
export const authTokenReducer = authTokenSlice.reducer;