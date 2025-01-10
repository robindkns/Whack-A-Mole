import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./features/gameSlice";
import leaderboardSlice from "./features/leaderboardSlice";

const store = configureStore({
    reducer: {
        game : gameSlice,
        leaderboard : leaderboardSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
