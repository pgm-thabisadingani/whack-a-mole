import React, { useEffect, useState } from 'react';
import mole from '../../assets/WAM_Mole.png';
import hole from '../../assets/WAM_Hole.png';

/**
 * Interface
 */
export type Props = {
  id: number;
};

// if the id mole id matches the random generated number increaes the score

const Mole = ({ id }: Props) => {
  const [randomNr, setRandomNr] = useState(0);
  const [counter, setCounter] = useState(0);

  // random nr generator function
  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // set interval between
  useEffect(() => {
    const interval = setInterval(() => {
      // generate random number between 1 and 12
      setRandomNr(randomNumberInRange(1, 12));
    }, 2000); // runs every 1 second
    return () => {
      clearInterval(interval);
    };
  }, []);

  // callback function

  const handleClick = () => {
    if (randomNr === id) {
      setCounter(counter + 1);
    } else {
      setCounter(counter);
    }
  };

  const showMole = () => {
    return (
      <>
        {randomNr === id ? (
          <img src={mole} alt="mole" />
        ) : (
          <img src={hole} alt="hole" />
        )}
      </>
    );
  };

  console.log(id + ' : ' + randomNr + ' : ' + counter);
  // function if random number === id, increase count by one and hide yes

  return <div onClick={handleClick}>{showMole()}</div>;
};

export default Mole;
