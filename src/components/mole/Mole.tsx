import React, { useState } from 'react';

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

  // random nr generator function to generate

  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // callback function

  const handleClick = () => {
    setRandomNr(randomNumberInRange(1, 12));
    if (randomNr === id) {
      setCounter(counter + 1);
    } else {
      setCounter(counter + 0);
    }
  };

  console.log(counter);
  // function if random number === id, increase count by one and hide yes

  return <div onClick={handleClick}>hello</div>;
};

export default Mole;
