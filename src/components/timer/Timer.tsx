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

// import { useState, useEffect } from 'react';

// type Props = {
//   initMins: number;
//   initSecs: number;
// };

// const Timer = ({ initMins = 2, initSecs = 60 }: Props) => {
//   // Combining useState values together for brevity

//   const [[mins, secs], setCountdown] = useState([initMins, initSecs]);

//   /**
//    * Triggers each second and whenever mins/seconds updates itself.
//    */
//   useEffect(() => {
//     // Timer that decrements itself each second and updates the mins/seconds downwards
//     let timerInterval = setInterval(() => {
//       // Countdown timer up, clear timer and do nothing
//       if (mins === 0 && secs === 0) {
//         clearInterval(timerInterval);
//       } else if (secs === 0) {
//         // Might be correct to set seconds to 59, but not sure
//         // should decrement from 60 seconds yeah?
//         setCountdown([mins - 1, 60]);
//       } else {
//         setCountdown([mins, secs - 1]);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [mins, secs]);

//   return (
//     <div>
//       {mins === 0 && secs === 0 ? null : (
//         <h1>

//           {mins}:{secs < 10 ? `0${secs}` : secs}
//         </h1>
//       )}
//     </div>
//   );
// };

// export default Timer;
