import React from 'react';
import Timer from '../timer/Timer';
import './navbar.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Navbar = () => {
  const score = useSelector((state: RootState) => state.game.score);

  return (
    <div className="navbar">
      <div className="navbar-info">
        <span>Score: {score}</span>
        <Timer />
      </div>
      <button className="navbar-btn">End Game</button>
    </div>
  );
};

export default Navbar;
