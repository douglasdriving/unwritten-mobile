import { configureStore } from '@reduxjs/toolkit';
import { authTokenReducer } from './authTokenSlice';

export default configureStore({
  reducer: {
    authToken: authTokenReducer
  }
})