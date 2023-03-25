import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    favorites: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {state.mode = state.mode === "light" ? "dark" : "light";},
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFavorites: (state, action) => {
            if(state.user) {
                state.user.favorites = action.payload.favorites;
            } else {
                console.error("No favourite spots");
            }
        }
        /** 
        setStudySpots: (state, action) => {
            state.studySpots = action.payload.studySpots;
        },
        setStudySpot: (state, action) => {
            const updatedStudySpots = state.studySpots.map((spot) => {
                if (spot._id === action.payload._id) return action.payload.spot;
                return spot; 
            });
            state.studySpots = updatedStudySpots;
        }
        */
    }
})

export const { setMode, setLogin, setLogout, setFavorites} = authSlice.actions;
export default authSlice.reducer;
