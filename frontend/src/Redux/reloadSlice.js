import { createSlice } from "@reduxjs/toolkit";

const reloadSlice = createSlice({
    name: 'refresh',
    initialState: {
        reload: false
    },
    reducers: {
        setReload: (state, action) => {
            state.reload = action.payload
        } 
    }
})

export const { setReload } = reloadSlice.actions;
export default reloadSlice.reducer;