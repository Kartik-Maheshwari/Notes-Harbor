import { createSlice } from "@reduxjs/toolkit";

// Fetch token from localStorage
const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!token,
    user: null,
    token: token,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Store token in localStorage
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      // Clear token from localStorage
      localStorage.removeItem("token");
      // Broadcast logout event to other tabs
      localStorage.setItem("logout", Date.now()); // Trigger the storage event
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
