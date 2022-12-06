import React, { useState } from 'react';
import { usersScores } from '../../data/data';

/**
 * Interface
 */
export interface Props {}

const Scoreboard = () => {
  const [currentUserScore, setCurrentUserScore] = useState([
    ...usersScores,
    { id: 19, name: 'Me', score: 9 },
  ]);

  // 1. sort an array (higher score)
  // 2. slice (make it 10)
  // 3. loop ( display sorted users)

  const soterdScoreboard = currentUserScore
    //desending order score
    .sort((a, b) => (a.score < b.score ? 1 : -1))
    .slice(0, 10)
    .map((user, i) => (
      <li key={i}>
        {user.name}:{user.score}
      </li>
    ));

  return <div>{soterdScoreboard}</div>;
};

export default Scoreboard;
