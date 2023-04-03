import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

/**
 * Redux slice for authentication state.
 * @constant
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Toggle the mode between light and dark.
     * @param {Object} state - The state object.
     */
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    
    /**
     * Set the login state with user and token.
     * @param {Object} state - The state object.
     * @param {Object} action - The action object.
     */
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    /**
     * Reset the user and token to null.
     * @param {Object} state - The state object.
     */
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    /**
     * Set favorite spots for the current user.
     * @param {Object} state - The state object.
     * @param {Object} action - The action object.
     */
    setFavoriteSpots: (state, action) => {
      if (state.user) {
        state.user.favoriteSpots = action.payload.favoriteSpots;
      } else {
        console.error("No favourite spots");
      }
    },
  },
});

export const { setMode, setLogin, setLogout, setFavoriteSpots } = authSlice.actions;
export default authSlice.reducer;