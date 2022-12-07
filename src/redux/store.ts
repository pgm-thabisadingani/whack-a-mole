import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../feature/gameSlice';
import userReducer from '../feature/userSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    currentUser: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
