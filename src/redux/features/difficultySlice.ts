import { createSlice } from '@reduxjs/toolkit';

const difficultySlice = createSlice({
    name: 'difficulty',
    initialState: {
        mode : '',
        moles : 0,
        timeBetween : 0,
        unlocked : false
    },
    reducers: {
        changeMode: (state, action) => {
            state.mode = action.payload
        },
        unlockingMode: (state) => {
            state.unlocked = true
        }
    },
});

export const { changeMode, unlockingMode } = difficultySlice.actions;
export default difficultySlice.reducer;
