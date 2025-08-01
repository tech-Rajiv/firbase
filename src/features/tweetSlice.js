
import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
  name: 'tweets',
  initialState: {
    feed: [],
    loading: false,
  },
  reducers: {
    setTweets(state, action) {
      state.feed = action.payload;
    },
    setTweetLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setTweets, setTweetLoading } = tweetSlice.actions;
export default tweetSlice.reducer;
