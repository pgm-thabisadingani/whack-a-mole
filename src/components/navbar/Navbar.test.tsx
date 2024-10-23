import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import { endCurrentGame } from '../../redux/reducers/gameSlice';

// Mock useSelector and useDispatch from react-redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock Timer component
jest.mock('../timer/Timer', () => () => <div>Timer Component</div>);

describe('Navbar Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Mock useDispatch to return our mockDispatch function
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  test('renders score and Timer component correctly', () => {
    // Mock Redux state to return the score
    (useSelector as unknown as jest.Mock).mockReturnValue(100);

    render(<Navbar />);

    // Check if the Timer component is rendered
    expect(screen.getByText('Timer Component')).toBeInTheDocument();

    // Check if the score is displayed correctly
    expect(screen.getByText(/Score: 100/i)).toBeInTheDocument();
  });

  test('dispatches endCurrentGame action when "End Game" button is clicked', () => {
    // Mock Redux state to return the score
    (useSelector as unknown as jest.Mock).mockReturnValue(100);

    render(<Navbar />);

    // Simulate clicking the "End Game" button
    fireEvent.click(screen.getByText(/End Game/i));

    // Ensure that the endCurrentGame action is dispatched
    expect(mockDispatch).toHaveBeenCalledWith(endCurrentGame());
  });
});
