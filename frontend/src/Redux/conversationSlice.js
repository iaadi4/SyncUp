import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        selected: null 
    },
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload
        }
    }
})

export const {setSelected} = conversationSlice.actions;
export default conversationSlice.reducer;