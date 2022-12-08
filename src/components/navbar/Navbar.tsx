import React from 'react';
import Timer from '../timer/Timer';
import './navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { endCurrentGame } from '../../feature/gameSlice';

const Navbar = () => {
  const score = useSelector((state: RootState) => state.game.score);
  const dispatch = useDispatch();

  // end the game open the scoreboard
  const handleClick = () => {
    dispatch(endCurrentGame());
  };

  return (
    <div className="navbar">
      <h3>Score: {score}</h3>
      <Timer />
      <button onClick={handleClick} className="navbar-btn btn">
        End Game
      </button>
    </div>
  );
};

export default Navbar;
