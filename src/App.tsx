import React, { useState } from 'react';
import './App.scss';
import { Moles, Navbar } from './components';

function App() {
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setScore(0);
    setStart(true);
    setFinish(false);
  };

  const endGame = () => {
    setStart(false);
    setFinish(true);
  };

  return (
    <div className="app">
      <div className="wrapper">
        {/* start the game */}
        {!start && !finish && (
          <div className="wrapper-start">
            <button onClick={startGame}>Start</button>
          </div>
        )}
        {/* game area*/}
        {start && (
          <div className="wrapper-play">
            <Navbar />
            <button onClick={endGame}>End game</button>
            <Moles />
          </div>
        )}
        {finish && (
          <div className="wrapper-finish">
            <button onClick={startGame}>Play again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
