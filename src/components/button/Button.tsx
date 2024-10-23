import React, { FC } from 'react';
import './button.scss';

/**
 * Props
 */
export type ButtonProps = {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
};

const Button: FC<ButtonProps> = ({ className, children, onClick, type }) => {
  return (
    <button type={type} className={`btn btn-${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
