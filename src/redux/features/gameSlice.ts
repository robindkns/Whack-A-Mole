import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        activeMole: null,
        score : 0,
        timeLeft : 5,
        isGameOver : false
    },
    reducers: {
        setActiveMole: (state, action) => {
            state.activeMole = action.payload;
        },
        incrementScore: (state) => {
            state.score += 1;
        },
        decrementTimer: (state) => {
            if(state.timeLeft > 0){
                state.timeLeft -= 1;
            }
            if(state.timeLeft === 0){
                state.isGameOver = true;
            }
        },
        resetGame: (state) => {
            state.activeMole = null;
            state.score = 0;
            state.timeLeft = 120;
            state.isGameOver = false;
        }
    },
});

export const { setActiveMole, incrementScore, decrementTimer, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
