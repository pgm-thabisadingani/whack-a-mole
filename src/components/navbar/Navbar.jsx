import React from 'react';
import './navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-info">
        <span>Score: 0</span>
        <span>time: 2:00</span>
      </div>
      <button className="navbar-btn">End Game</button>
    </div>
  );
};

export default Navbar;
