import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions to fetch data
export const fetchUploads = createAsyncThunk('user/fetchUploads', async () => {
  const response = await axios.get('/api/uploads');
  return response.data;
});

export const fetchFollowers = createAsyncThunk('user/fetchFollowers', async () => {
  const response = await axios.get('/api/followers');
  return response.data;
});

export const fetchFollowing = createAsyncThunk('user/fetchFollowing', async () => {
  const response = await axios.get('/api/following');
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    uploads: [],
    followers: [],
    following: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    removeFollower(state, action) {
      state.followers = state.followers.filter(follower => follower.id !== action.payload);
    },
    unfollowUser(state, action) {
      state.following = state.following.filter(following => following.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploads.fulfilled, (state, action) => {
        state.uploads = action.payload;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.following = action.payload;
      });
  },
});

export const { removeFollower, unfollowUser } = userSlice.actions;

export default userSlice.reducer;
