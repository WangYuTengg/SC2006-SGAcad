import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    studySpots: [],
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
        /** 
        setStudySpots: (state, action) => {
            state.studySpots = action.payload.studySpots;
        },
        setStudySpot: (state, action) => {
            const updatedStudySpots = state.studySpots.map((spot) => {
                if (spot._id === action.payload.id) return action.payload.spot;
                return spot; 
            });
            state.studySpots = updatedStudySpots;
        }
        */
    }
})

export const { setMode, setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;
