import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        activeMole: null,
    },
    reducers: {
        setActiveMole: (state, action) => {
            state.activeMole = action.payload;
        },
    },
});

export const { setActiveMole } = gameSlice.actions;
export default gameSlice.reducer;
