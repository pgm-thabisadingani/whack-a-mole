import React, { useEffect, useState, useRef } from 'react';
import mole from '../../assets/WAM_Mole.png';
import hole from '../../assets/WAM_Hole.png';
import './mole.scss';
import { useDispatch } from 'react-redux';
import { increaseScore } from '../../feature/gameSlice';

/**
 * Interface
 */
export type Props = {
  id: number;
};

// if the id mole id matches the random generated number increaes the score

const Mole = ({ id }: Props) => {
  const [randomNr, setRandomNr] = useState(0);
  const moleRef = useRef(null);
  const dispatch = useDispatch();

  // random nr generator function
  const randomNumberInRange = () => {
    return Math.floor(Math.random() * 12);
  };

  // set interval between mole pop-ups
  // callback function
  useEffect(() => {
    const interval = setInterval(() => {
      // generate random number between 1 and 12
      setRandomNr(randomNumberInRange());
    }, 1000); // runs every 1 second

    return () => {
      clearInterval(interval);
    };
  }, [randomNr]);

  const handleClick = (id: number) => {
    if (randomNr === id) {
      dispatch(increaseScore());
    }
  };

  // auto toggle image based on randomNr and id;
  const showMole = () => {
    return (
      <div className="mole-img">
        {randomNr === id ? (
          <img src={mole} alt="mole" />
        ) : (
          <img src={hole} alt="hole" />
        )}
      </div>
    );
  };

  //   console.log(id + ' : ' + randomNr + ' : ' + score);
  // function if random number === id, increase count by one and hide yes

  return (
    <div ref={moleRef} className="mole" onClick={() => handleClick(id)}>
      {showMole()}
    </div>
  );
};

export default Mole;
