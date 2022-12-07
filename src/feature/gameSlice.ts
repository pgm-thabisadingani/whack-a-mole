import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface Game {
//   score: number;
//   start: boolean;
//   end: boolean;
//   timer: number;
// }

// interface for score
export interface GameState {
  score: number;
  start: boolean;
  end: boolean;
  timer: number;
}

//
const initialState: GameState = {
  score: 0,
  start: false,
  end: false,
  timer: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increaseScore: (state) => {
      state.score += 1;
    },
    startNewGame: (state) => {
      state.score = 0;
      state.start = true;
      state.end = false;
      state.timer = 120;
    },
    endCurrentGame: (state) => {
      state.start = false;
      state.end = true;
      state.timer = 0;
    },
  },
});

export const { increaseScore, startNewGame, endCurrentGame } =
  gameSlice.actions;

export default gameSlice.reducer;
