import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Moles from './Moles'; // Import the Moles component

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock(
  '../mole/Mole',
  () =>
    ({ id, isActive }: { id: number; isActive: boolean }) =>
      (
        <div data-testid={`mole-${id}`} className={isActive ? 'active' : ''}>
          Mole {id}
        </div>
      )
);

describe('Moles Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders only one mole at a time', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      game: {
        totalMoles: 1,
        start: true,
        end: false,
      },
    });

    render(<Moles />);

    // Check if only one mole is rendered
    const moles = screen.getAllByTestId(/mole-/);

    expect(moles.length).toBe(1);
  });

  test('resets active mole when the game ends', () => {
    jest.useFakeTimers();

    (useSelector as unknown as jest.Mock).mockReturnValue({
      game: {
        totalMoles: 1,
        start: true,
        end: false,
      },
    });

    render(<Moles />);

    // Fast-forward time by 1 second (game is running)
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Simulate game ending by changing state
    (useSelector as unknown as jest.Mock).mockReturnValue({
      game: {
        totalMoles: 1,
        start: false,
        end: true,
      },
    });

    render(<Moles />);

    // After the game ends, no mole should be active
    const activeMoles = screen
      .getAllByTestId(/mole-/)
      .filter((mole) => mole.classList.contains('active'));
    expect(activeMoles.length).toBe(0);
  });
});
