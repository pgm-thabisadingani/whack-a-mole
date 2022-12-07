import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { endCurrentGame } from '../../feature/gameSlice';
import { RootState } from '../../redux/store';

const Timer = () => {
  const dispatch = useDispatch();

  const timer = useSelector((state: RootState) => state.game.timer);
  const [delay, setDelay] = useState(+timer);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      // clear timer and show score board
      dispatch(endCurrentGame());
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <h1>
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </>
  );
};

export default Timer;
