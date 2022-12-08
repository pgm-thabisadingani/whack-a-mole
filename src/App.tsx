import React from 'react';
import './App.scss';
import { FaPlay } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Moles, Navbar, Scoreboard } from './components';
import { RootState } from './redux/store';
import { startNewGame } from './feature/gameSlice';

function App() {
  const dispatch = useDispatch();
  const finish = useSelector((state: RootState) => state.game.end);
  const start = useSelector((state: RootState) => state.game.start);

  const startGame = () => {
    dispatch(startNewGame());
  };

  return (
    <div className="app">
      <div className="wrapper">
        {/* start the game */}
        {!start && !finish && (
          <div className="wrapper-start">
            <div className="wrapper-start_content">
              <h1>
                Whack <br />A <br />
                Mole
              </h1>
              <button className="btn btn-start" onClick={startGame}>
                <FaPlay /> Play
              </button>
            </div>
          </div>
        )}
        {/* game area*/}
        {start && (
          <div className="wrapper-play">
            <div className="wrapper-play_nav">
              <Navbar />
              {/* <button onClick={endGame}>End game</button> */}
            </div>
            <Moles />
          </div>
        )}
        {finish && (
          <div className="wrapper-finish">
            <button onClick={startGame}>Play again</button>
            <Scoreboard />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
