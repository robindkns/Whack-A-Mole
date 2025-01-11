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
            if (state.mode === 'normal') {
                state.moles = 12;
                state.timeBetween = 1000;
            } else if (state.mode === 'hard') {
                state.moles = 24;
                state.timeBetween = 600;
            }
        },
        unlockingMode: (state) => {
            state.unlocked = true
        }
    },
});

export const { changeMode, unlockingMode } = difficultySlice.actions;
export default difficultySlice.reducer;
