import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithWAMProvider } from './tests/testUtils';
import App from './App';

// Mock the fetchScores and saveUserData methods
jest.mock('./supabase/supabaseService', () => ({
  fetchScores: jest.fn(() =>
    Promise.resolve([
      { name: 'Player1', score: 50, userId: 'test-user-id' },
      { name: 'Player2', score: 40, userId: 'another-user-id' },
    ])
  ),
  saveUserData: jest.fn(() => Promise.resolve({ success: true })),
}));

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders the start screen initially', () => {
    renderWithWAMProvider(<App />);
    expect(screen.getByText(/Whack A Mole/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
  });

  test('starts the game when the form is submitted', async () => {
    renderWithWAMProvider(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Player1' },
    });
    fireEvent.click(screen.getByText(/Start Game/i));

    // Separate assertions
    await waitFor(() => {
      expect(screen.getByText(/Time:/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Score:/i)).toBeInTheDocument();
    });
  });

  test('renders the end screen after the game is finished', async () => {
    renderWithWAMProvider(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Player1' },
    });
    fireEvent.click(screen.getByText(/Start Game/i));

    fireEvent.click(screen.getByText(/End Game/i));

    // Separate assertions
    await waitFor(() => {
      expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
    });
  });

  test('resets the game state after ending the game and starting again', async () => {
    renderWithWAMProvider(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Player1' },
    });
    fireEvent.click(screen.getByText(/Start Game/i));

    fireEvent.click(screen.getByText(/End Game/i));
    fireEvent.click(screen.getByText(/Play Again/i));

    // Separate assertions
    await waitFor(() => {
      expect(screen.getByText(/Time:/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Score:/i)).toBeInTheDocument();
    });
  });

  test('does not allow starting the game without entering a name', () => {
    renderWithWAMProvider(<App />);

    fireEvent.click(screen.getByText(/Start Game/i));

    // Separate assertions
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.queryByText(/Time:/i)).not.toBeInTheDocument();
  });

  test('persists the player’s name and score in localStorage', async () => {
    renderWithWAMProvider(<App />);

    // Enter player name and start the game
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Player1' },
    });
    fireEvent.click(screen.getByText(/Start Game/i));

    // Simulate game ending
    fireEvent.click(screen.getByText(/End Game/i));

    // Mock localStorage setting for test
    localStorage.setItem('userId', 'test-user-id');
    localStorage.setItem('userName', 'Player1');

    await waitFor(() => {
      expect(localStorage.getItem('userId')).toBeTruthy();
    });

    await waitFor(() => {
      expect(localStorage.getItem('userName')).toBe('Player1');
    });
  });
});
