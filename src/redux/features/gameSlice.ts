import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        activeMole: null,
        score : 0,
        timer : 0
    },
    reducers: {
        setActiveMole: (state, action) => {
            state.activeMole = action.payload;
        },
        incrementScore: (state) => {
            state.score += 1;
        }
    },
});

export const { setActiveMole, incrementScore } = gameSlice.actions;
export default gameSlice.reducer;
