import React from 'react';
import './mole.scss';

/**
 * Props
 */
export type Props = {
  className: string;
  children: React.ReactNode;
};

const Button = ({ className, children }: Props) => {
  return <button className={`btn btn-${className}`}>{children}</button>;
};

export default Button;
