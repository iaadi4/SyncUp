import { createSlice } from "@reduxjs/toolkit";

const reloadSlice = createSlice({
    name: 'refresh',
    initialState: {
        contactReload: false
    },
    reducers: {
        setContactReload: (state, action) => {
            state.contactReload = action.payload
        }
    }
})

export const { setContactReload } = reloadSlice.actions;
export default reloadSlice.reducer;