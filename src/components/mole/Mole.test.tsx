import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for assertions like toBeInTheDocument
import { useDispatch, useSelector } from 'react-redux';
import Mole from './Mole';

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

let mockDispatch = jest.fn();

describe('Mole Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      start: true,
      end: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders mole when active', () => {
    // Render the Mole component with isActive = true
    render(<Mole id={1} isActive={true} />);

    // Expect the mole image to be present in the document
    const moleImg = screen.getByAltText('mole');
    expect(moleImg).toBeInTheDocument();
  });

  test('renders hole when not active', () => {
    // Render the Mole component with isActive = false
    render(<Mole id={2} isActive={false} />);

    // Expect the hole image to be present in the document
    const holeImg = screen.getByAltText('hole');
    expect(holeImg).toBeInTheDocument();
  });

  test('dispatches increaseScore when mole is active and clicked', () => {
    (useSelector as unknown as jest.Mock)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    render(<Mole id={3} isActive={true} />);

    const mole = screen.getByTestId('mole-3');
    fireEvent.click(mole);

    // Check that the dispatch function is called with increaseScore(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'game/increaseScore',
      payload: 1, // Expecting payload of 1 now, not the ID
    });
  });

  test('does not dispatch increaseScore when game is not running', () => {
    // Mock useSelector to return game not started (start = false)
    (useSelector as unknown as jest.Mock).mockReturnValue({
      start: false,
      end: false,
    });

    // Render the Mole component with isActive = true
    render(<Mole id={4} isActive={true} />);

    // Simulate a click event
    const mole = screen.getByTestId('mole-4');
    fireEvent.click(mole);

    // Expect dispatch NOT to be called
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('does not dispatch increaseScore when game has ended', () => {
    // Mock useSelector to return game ended (end = true)
    (useSelector as unknown as jest.Mock).mockReturnValue({
      start: true,
      end: true,
    });

    // Render the Mole component with isActive = true
    render(<Mole id={5} isActive={true} />);

    // Simulate a click event
    const mole = screen.getByTestId('mole-5');
    fireEvent.click(mole);

    // Expect dispatch NOT to be called
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
