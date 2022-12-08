import React, { useState } from 'react';
import { usersScores } from '../../data/data';
import { RootState } from '../../redux/store';
import './scoreboard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { startNewGame } from '../../feature/gameSlice';

/**
 * Interface
 */
export interface Props {}

const Scoreboard = () => {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.game.score);
  const [currentUserScore, setCurrentUserScore] = useState([
    ...usersScores,
    { id: 19, name: 'Me', score: score },
  ]);

  const startGame = () => {
    dispatch(startNewGame());
  };

  // 1. sort an array (higher score)
  // 2. slice (make it 10)
  // 3. loop ( display sorted users)

  const sortedScoreboard = currentUserScore
    //desending order score
    .sort((a, b) => (a.score < b.score ? 1 : -1))
    .slice(0, 10)
    .map((user, i) => (
      <li key={i} className="scoreboard-list_item">
        {/* <div>{i + 1}</div> */}
        <span className="user-name">{user.name}</span>
        <span className="user-score">{user.score}</span>
      </li>
    ));

  return (
    <div className="scoreboard">
      <h2>⭐Leaderboard⭐</h2>
      <ol className="scoreboard-list">{sortedScoreboard}</ol>
      <button className="btn btn-finish" onClick={startGame}>
        Play Again
      </button>
    </div>
  );
};

export default Scoreboard;
