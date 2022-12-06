import React, { useState } from 'react';
import './App.scss';
import { Moles, Navbar } from './components';

function App() {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setStart(true);
    setEnd(false);
  };

  const endGame = () => {
    setStart(false);
    setEnd(true);
  };

  return (
    <div className="app">
      <div className="wrapper">
        {/* start the game */}
        {!start && !end && (
          <div className="start">
            <button onClick={startGame}>Start</button>
          </div>
        )}
        {/* game area*/}
        {start && (
          <div className="play">
            <button onClick={endGame}>end game</button>
            <Moles />
          </div>
        )}
        {end && (
          <div className="play">
            <button onClick={startGame}>Play again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
