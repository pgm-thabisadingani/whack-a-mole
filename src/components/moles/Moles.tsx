import React from 'react';
import Mole from '../mole/Mole';
import { useSelector } from 'react-redux';
import './moles.scss';
import { RootState } from '../../redux/store';

/**
 * Interface
 */
export interface Props {}

const Moles = () => {
  // constatnt for the total number of moles
  const totalMoles = useSelector((state: RootState) => state.game.totalMoles);

  const moles = new Array(totalMoles)
    .fill(null)
    .map((_, i) => <Mole key={i} id={i} />);

  return <div className="moles">{moles}</div>;
};

export default Moles;
