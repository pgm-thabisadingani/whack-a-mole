import { combineReducers } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
