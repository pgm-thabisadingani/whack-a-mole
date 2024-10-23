import React from 'react';

import Button from './Button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button Component', () => {
  test('renders the button with the correct text', () => {
    render(
      <Button className="primary" type="button">
        Click Me
      </Button>
    );

    // Check if the button is rendered
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls the onClick function when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <Button className="primary" onClick={mockOnClick} type="button">
        Click Me
      </Button>
    );

    // Simulate a click event
    fireEvent.click(screen.getByText('Click Me'));

    // Ensure the onClick function is called
    expect(mockOnClick).toHaveBeenCalled();
  });
});
