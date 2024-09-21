import { createSlice } from "@reduxjs/toolkit";

// Check if token exists in localStorage
const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!token, // True if token exists
    user: null,
    token: token,        // Store token
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem(token); // Clear token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
