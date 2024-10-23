import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the game state
interface GameState {
  score: number;
  start: boolean;
  end: boolean;
  timer: number;
  totalMoles: number;
}

const initialState: GameState = {
  score: 0,
  start: false,
  end: false,
  timer: 120,
  totalMoles: 12,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increaseScore: (state: GameState, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    startNewGame: (state: GameState) => {
      state.score = 0;
      state.start = true;
      state.end = false;
      state.timer = 120;
    },
    resetGame: (state: GameState) => {
      state.start = false;
      state.end = false;
      state.score = 0;
      state.timer = 120;
    },
    endCurrentGame: (state: GameState) => {
      state.start = false;
      state.end = true;
    },
  },
});

export const { increaseScore, startNewGame, resetGame, endCurrentGame } =
  gameSlice.actions;

export default gameSlice.reducer;
