import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  email: "",
  password: "",
  access: null,
  refresh: null,
  profilePicture: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.email = "";
      state.password = "";
      state.access = null;
      state.refresh = null;
      state.profilePicture = null;
    },

    setCredentials: (state, action) => {
      const { access, refresh, user, profilePicture } = action.payload;
      state.access = access;
      state.refresh = refresh;
      state.user = user || null;
      state.isAuthenticated = !!access;
      state.profilePicture = profilePicture || null;

      // Map the API response user data to our expected structure
      if (state.user) {
        state.user.fullName = state.user.name || "";
        state.user.email = state.user.email || "";
        state.user.role = state.user.role || "";
        state.user.id = state.user.id || null;
      }
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectEmail = (state) => state.auth.email;
export const selectProfilePicture = (state) => state.auth.profilePicture;
export const selectFullName = (state) => state.auth.user?.fullName || "";
export const selectAccessToken = (state) => state.auth.access;
export const selectRefreshToken = (state) => state.auth.refresh;
export const selectUserRole = (state) => state.auth.user?.role || "";