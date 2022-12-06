import React from 'react';

/**
 * Interface
 */
export type Props = {
  id: number;
};

// if the id mole id matches the random generated number increaes the score

const Mole = ({ id }: Props) => {
  return <div onClick={() => console.log(id)}>hello</div>;
};

export default Mole;
