import React from 'react';
import Timer from '../timer/Timer';
import './navbar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

import { endCurrentGame } from '../../redux/reducers/gameSlice';
import Button from '../button/Button';

const Navbar = () => {
  const score = useSelector((state: RootState) => state.game.score);
  const dispatch: AppDispatch = useDispatch();

  // end the game open the scoreboard
  const handleClick = () => {
    dispatch(endCurrentGame());
  };

  return (
    <div className="navbar">
      <Timer />
      <h3>Score: {score}</h3>
      <Button className="endGame" onClick={handleClick}>
        End Game
      </Button>
    </div>
  );
};

export default Navbar;
