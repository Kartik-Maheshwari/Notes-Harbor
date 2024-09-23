import { createSlice } from "@reduxjs/toolkit";

// Fetch token from sessionStorage instead of localStorage
const token = sessionStorage.getItem("token");

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
      state.user = action.payload;
      // Store token in sessionStorage
      sessionStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      // Clear sessionStorage when logging out
      sessionStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
