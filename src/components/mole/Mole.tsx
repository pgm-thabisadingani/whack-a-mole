import React, { useEffect, useState, useRef } from 'react';
import mole from '../../assets/WAM_Mole.png';
import hole from '../../assets/WAM_Hole.png';
import Audio from 'ts-audio';
import popSfx from '../../assets/sounds/pop.mp3';
import slowSfx from '../../assets/sounds/pop.mp3';
import './mole.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseScore } from '../../feature/gameSlice';
import { RootState } from '../../redux/store';

/**
 * Interface
 */
export type Props = {
  id: number;
};

// if the id mole id matches the random generated number increase the score
const Mole = ({ id }: Props) => {
  const [randomNr, setRandomNr] = useState(0);
  const moleRef = useRef(null);
  const dispatch = useDispatch();
  const totalMoles = useSelector((state: RootState) => state.game.totalMoles);

  // random nr generator function
  const randomNumberInRange = () => {
    return Math.floor(Math.random() * totalMoles);
  };

  // TO DO fix Audio
  const audio = Audio({
    file: popSfx,
    loop: false,
    volume: 0.8,
  });

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
  }, []);

  const handleClick = (id: number) => {
    if (randomNr === id) {
      dispatch(increaseScore());
      audio.play();
    } else {
      console.log('you are terrible');
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

  return (
    <div ref={moleRef} className="mole" onClick={() => handleClick(id)}>
      {showMole()}
    </div>
  );
};

export default Mole;
