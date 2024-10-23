// Define action types
export const INCREASE_SCORE = 'INCREASE_SCORE';
export const START_NEW_GAME = 'START_NEW_GAME';
export const END_CURRENT_GAME = 'END_CURRENT_GAME';
export const RESET_GAME = 'RESET_GAME';

// Define the action interfaces
interface IncreaseScoreAction {
  type: typeof INCREASE_SCORE;
  payload: number;
}

interface StartNewGameAction {
  type: typeof START_NEW_GAME;
}

interface EndCurrentGameAction {
  type: typeof END_CURRENT_GAME;
}

interface ResetGameAction {
  type: typeof RESET_GAME;
}

// Combine the action types into a union type
export type GameActionTypes =
  | IncreaseScoreAction
  | StartNewGameAction
  | EndCurrentGameAction
  | ResetGameAction;

// Action creators
export const increaseScore = (id: number): GameActionTypes => ({
  type: INCREASE_SCORE,
  payload: id,
});

export const startNewGame = (): GameActionTypes => ({
  type: START_NEW_GAME,
});

export const endCurrentGame = (): GameActionTypes => ({
  type: END_CURRENT_GAME,
});

export const resetGame = (): GameActionTypes => ({
  type: RESET_GAME,
});
