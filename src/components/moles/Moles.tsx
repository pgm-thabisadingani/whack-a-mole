import React from 'react';
import bg from '../../assets/WAM_bg.jpg';
import Mole from '../mole/Mole';
import './moles.scss';

/**
 * Interface
 */
export interface Props {}

const Moles = () => {
  // constatnt for the total number of moles
  const totalMoles = 12;

  const items = new Array(totalMoles)
    .fill(null)
    .map((_, i) => <Mole key={i} id={i} />);

  return <div className="moles">{items}</div>;
};

export default Moles;
