import React from 'react';
import Timer from '../timer/Timer';
import './navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-info">
        <span>Score: 0</span>
        <Timer />
      </div>
      <button className="navbar-btn">End Game</button>
    </div>
  );
};

export default Navbar;
