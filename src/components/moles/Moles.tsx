import React from 'react';
import Mole from '../mole/Mole';
import './moles.scss';

/**
 * Interface
 */
export interface Props {}

const Moles = () => {
  // constatnt for the total number of moles
  const totalMoles = 12;

  const moles = new Array(totalMoles)
    .fill(null)
    .map((_, i) => <Mole key={i} id={i} />);

  return <div className="moles">{moles}</div>;
};

export default Moles;
