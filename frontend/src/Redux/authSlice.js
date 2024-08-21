import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: JSON.parse(localStorage.getItem('user')) || null
    },
    reducers: {
        login: (state, action) => {
            state.userData = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userData = null
            localStorage.removeItem('user')
        }
    }
})


export const {login, logout} = authSlice.actions;

export default authSlice.reducer;