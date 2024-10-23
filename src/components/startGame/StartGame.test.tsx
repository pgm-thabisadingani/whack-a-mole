import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import StartGame from './StartGame';
import { setUserData } from '../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

// Mock the Redux dispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mock the setUserData action
jest.mock('../../redux/reducers/userSlice', () => ({
  setUserData: jest.fn(),
}));

describe('StartGame Component', () => {
  const mockDispatch = jest.fn();
  const mockOnStartGame = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
    mockOnStartGame.mockClear();
  });

  test('renders the component', () => {
    render(<StartGame onStartGame={mockOnStartGame} />);

    expect(screen.getByText(/Whack A Mole/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument();
  });

  test('updates the name input value', () => {
    render(<StartGame onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText(/Enter your name/i);

    // Simulate typing a name into the input
    fireEvent.change(input, { target: { value: 'Player1' } });

    expect(input).toHaveValue('Player1');
  });

  test('does not start the game if the input is empty', () => {
    render(<StartGame onStartGame={mockOnStartGame} />);

    const startButton = screen.getByText(/Start Game/i);

    // Simulate clicking the Start Game button without entering a name
    fireEvent.click(startButton);

    // Ensure that setUserData or onStartGame are not called
    expect(setUserData).not.toHaveBeenCalled();
    expect(mockOnStartGame).not.toHaveBeenCalled();
  });

  test('dispatches setUserData and triggers onStartGame when a valid name is submitted', async () => {
    render(<StartGame onStartGame={mockOnStartGame} />);

    const input = screen.getByPlaceholderText(/Enter your name/i);
    const startButton = screen.getByText(/Start Game/i);

    // Simulate typing a name and submitting the form
    fireEvent.change(input, { target: { value: 'Player1' } });
    fireEvent.click(startButton);

    // Wait for the dispatch to be called
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(setUserData).toHaveBeenCalledWith({
        id: expect.any(String),
        name: 'Player1',
      });
    });

    // Ensure that onStartGame is triggered
    expect(mockOnStartGame).toHaveBeenCalled();
  });
});
