import React, { useState, useEffect } from 'react';

const Timer = ({ delayResend = '120' }) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
      // clear timer and show score board
      console.log('time is up');
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
