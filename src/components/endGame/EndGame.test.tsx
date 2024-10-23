import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScores, saveUserData } from '../../supabase/supabaseService';
import { startNewGame, resetGame } from '../../redux/reducers/gameSlice'; // Assuming you're using Redux Toolkit
import EndGame from './EndGame';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../supabase/supabaseService', () => ({
  fetchScores: jest.fn(),
  saveUserData: jest.fn(),
}));

describe('EndGame Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Set up useDispatch and useSelector mocks
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback({
        game: { score: 10 },
        user: { name: 'Player1', id: 'user123' },
      })
    );

    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('renders leaderboard data correctly', async () => {
    // Mock leaderboard data returned by fetchScores
    (fetchScores as jest.Mock).mockResolvedValue([
      { name: 'Player1', score: 10, userId: 'user123' },
      { name: 'Player2', score: 5, userId: 'user456' },
    ]);

    render(<EndGame />);

    // Check if leaderboard is loading first
    expect(screen.getByText(/Loading leaderboard/i)).toBeInTheDocument();

    // Wait for the leaderboard to be loaded
    await waitFor(() => {
      expect(screen.getByText(/Player1/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Player2/i)).toBeInTheDocument();
    });
  });

  test('displays an error message when leaderboard fails to load', async () => {
    (fetchScores as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch leaderboard')
    );

    render(<EndGame />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Failed to update leaderboard/i)
      ).toBeInTheDocument();
    });
  });

  test('saves user data when the game ends', async () => {
    render(<EndGame />);

    // Wait for leaderboard data to be loaded
    await waitFor(() => {
      expect(fetchScores).toHaveBeenCalled();
    });

    // Ensure that the user data is saved
    expect(saveUserData).toHaveBeenCalledWith('user123', 'Player1', 10);
  });

  test('correctly handles "Play Again" action', async () => {
    render(<EndGame />);

    // Simulate clicking "Play Again" button
    fireEvent.click(screen.getByText(/Play Again/i));

    // Check that the startNewGame action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(startNewGame());
  });

  test('correctly handles "Quit" action', () => {
    render(<EndGame />);

    // Simulate clicking "Quit" button
    fireEvent.click(screen.getByText(/Quit/i));

    // Check that the resetGame action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(resetGame());
  });
});
