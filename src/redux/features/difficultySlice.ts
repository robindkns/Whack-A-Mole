import { createSlice } from '@reduxjs/toolkit';

const difficultySlice = createSlice({
    name: 'difficulty',
    initialState: {
        mode : '',
        moles : 0,
        timeBetween : 0
    },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload
        }
    },
});

export const { changeMode } = difficultySlice.actions;
export default difficultySlice.reducer;
