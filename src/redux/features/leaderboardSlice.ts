import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        data: [
            { id: 1, name: "AUD", score: 117 },
            { id: 2, name: "DKS", score: 97 },
            { id: 3, name: "POL", score: 54 },
            { id: 4, name: "LEO", score: 75 },
            { id: 5, name: "JEA", score: 105 },
            { id: 6, name: "PAU", score: 100 },
            { id: 7, name: "MAX", score: 112 },
            { id: 8, name: "SEB", score: 34 },
            { id: 9, name: "GIL", score: 101 },
            { id: 10, name: "PIE", score: 68 }
        ],
    },
    reducers: {
        addScore: (state, action: PayloadAction<{ id: number; name: string; score: number }>) => {
            state.data = [...state.data, action.payload]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10); 
        }
    },
});

export const { addScore } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
