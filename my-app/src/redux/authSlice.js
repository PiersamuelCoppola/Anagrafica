import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;            
        },
        getToken: (state, action) => {
            state.token= action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        }
    }
});

export const { login, getToken, logout } = authSlice.actions;

export default authSlice.reducer;