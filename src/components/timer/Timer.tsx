import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { endCurrentGame } from '../../redux/reducers/gameSlice';
import { AppDispatch, RootState } from '../../redux/store';

const Timer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const timer = useSelector((state: RootState) => state.game.timer);
  const [delay, setDelay] = useState(timer);

  useEffect(() => {
    if (delay <= 0) {
      dispatch(endCurrentGame());
      return;
    }

    const intervalId = setInterval(() => {
      // Decrease delay every second
      setDelay((prevDelay: number) => prevDelay - 1);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [delay, dispatch]);

  const minutes = Math.floor(delay / 60);
  const seconds = delay % 60;

  return (
    <div>
      <h3>
        Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h3>
    </div>
  );
};

export default Timer;
