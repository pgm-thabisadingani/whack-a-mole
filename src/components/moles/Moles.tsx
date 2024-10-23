import React, { useEffect, useState } from 'react';
import Mole from '../mole/Mole';
import './moles.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Moles = () => {
  const [activeMoleId, setActiveMoleId] = useState<number | null>(null);
  const totalMoles = useSelector((state: RootState) => state.game.totalMoles);
  const start = useSelector((state: RootState) => state.game.start);
  const end = useSelector((state: RootState) => state.game.end);

  // Helper function to generate a random mole index
  const getRandomMoleId = () => {
    if (totalMoles > 0) {
      return Math.floor(Math.random() * totalMoles);
    }
    return null;
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let moleTimeoutId: NodeJS.Timeout | null = null;

    if (start && !end && totalMoles > 0) {
      intervalId = setInterval(() => {
        const randomId = getRandomMoleId();
        if (randomId !== null) {
          setActiveMoleId(randomId);

          // Make the mole disappear after 1 second
          if (moleTimeoutId) {
            clearTimeout(moleTimeoutId);
          }
          moleTimeoutId = setTimeout(() => {
            setActiveMoleId(null);
          }, 1000);
        }
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (moleTimeoutId) {
        clearTimeout(moleTimeoutId);
      }
      setActiveMoleId(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, totalMoles]);

  // Create the moles grid
  const moles = new Array(totalMoles)
    .fill(null)
    .map((_, i) => <Mole key={i} id={i} isActive={i === activeMoleId} />);

  return <div className="moles">{moles}</div>;
};

export default Moles;
