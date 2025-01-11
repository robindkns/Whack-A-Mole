import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./features/gameSlice";
import leaderboardSlice from "./features/leaderboardSlice";
import difficultySlice from "./features/difficultySlice";

const store = configureStore({
    reducer: {
        game : gameSlice,
        leaderboard : leaderboardSlice,
        difficulty : difficultySlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
