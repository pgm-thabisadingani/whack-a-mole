import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface for game
export interface GameState {
  score: number;
  start: boolean;
  end: boolean;
  timer: number;
  totalMoles: number;
}

//
const initialState: GameState = {
  //   score:
  //     (localStorage.getItem('score') &&
  //       JSON.parse(localStorage.getItem('score'))) ||
  //     0,
  score: 0,
  start: false,
  end: false,
  timer: 0,
  totalMoles: 12,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increaseScore: (state) => {
      state.score += 1;
      localStorage.setItem('score', JSON.stringify(state.score));
    },
    startNewGame: (state) => {
      state.score = 0;
      state.start = true;
      state.end = false;
      state.timer = 120;
      localStorage.setItem('start', JSON.stringify(state.start));
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
