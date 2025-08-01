// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import tweetReducer from '../features/tweetSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tweets: tweetReducer,
  },
});

export default store;
