import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        selected: null 
    },
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload
        },
        setRemove: (state) => {
            state.selected = null
        }
    }
})

export const { setSelected, setRemove } = conversationSlice.actions;
export default conversationSlice.reducer;