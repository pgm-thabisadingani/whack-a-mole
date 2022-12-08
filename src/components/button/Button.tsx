import React from 'react';
import './button.scss';

/**
 * Props
 */
export type Props = {
  className: string;
  children: React.ReactNode;
  onClick: any;
};

const Button = ({ className, children, onClick }: Props) => {
  return (
    <button className={`btn btn-${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
