import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FinalScoreModal from './FinalScoreModal';

describe('FinalScoreModal Component', () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the final score and position correctly when new personal best is achieved', async () => {
    render(
      <FinalScoreModal
        score={20}
        position={3}
        personalBest={15}
        isFirstPlace={false}
        onClose={mockOnClose}
      />
    );

    // Check if the final score is displayed
    expect(screen.getByText(/Your score: 20/i)).toBeInTheDocument();

    // Check if the new personal best message is displayed
    expect(screen.getByText(/New Personal Best/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You've beaten your personal best with a score of 20!/i)
    ).toBeInTheDocument();

    // Check if the position is displayed
    expect(screen.getByText(/Your position is: 3/i)).toBeInTheDocument();
  });

  test('displays a personal best message when the player beats their personal best', () => {
    render(
      <FinalScoreModal
        score={20}
        position={2}
        personalBest={15}
        isFirstPlace={false}
        onClose={mockOnClose}
      />
    );

    // Check if the new personal best message is displayed
    expect(screen.getByText(/New Personal Best/i)).toBeInTheDocument();
    expect(
      screen.getByText(/You've beaten your personal best with a score of 20!/i)
    ).toBeInTheDocument();
  });

  test('displays a trophy when the player is in first place', () => {
    render(
      <FinalScoreModal
        score={30}
        position={1}
        personalBest={25}
        isFirstPlace={true}
        onClose={mockOnClose}
      />
    );

    // Check if the first place trophy message is displayed
    expect(
      screen.getByText(/Congratulations, 1st place!/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Your score: 30/i)).toBeInTheDocument();
  });

  test('encourages the player to try again if the score is zero', () => {
    render(
      <FinalScoreModal
        score={0}
        position={null}
        personalBest={5}
        isFirstPlace={false}
        onClose={mockOnClose}
      />
    );

    // Check if the encouragement message is displayed when the score is zero
    expect(
      screen.getByText(/Don't give up! Give it another try/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Your personal best: 5/i)).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <FinalScoreModal
        score={10}
        position={3}
        personalBest={15}
        isFirstPlace={false}
        onClose={mockOnClose}
      />
    );

    // Simulate clicking the close button
    fireEvent.click(screen.getByText(/Close/i));

    // Ensure the onClose function is called
    expect(mockOnClose).toHaveBeenCalled();
  });
});
