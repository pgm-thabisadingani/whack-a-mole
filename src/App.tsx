import React, { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import {
  resetGame,
  startNewGame,
  endCurrentGame,
} from './redux/reducers/gameSlice';
import { StartGame, Navbar, Moles, EndGame } from './components';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const finish = useSelector((state: RootState) => state.game?.end ?? false);
  const start = useSelector((state: RootState) => state.game?.start ?? false);

  // Load game state from localStorage on initial load
  useEffect(() => {
    const savedStart = localStorage.getItem('gameStart') === 'true';
    const savedFinish = localStorage.getItem('gameEnd') === 'true';

    // Ensure game state is set based on localStorage
    if (savedFinish) {
      dispatch(endCurrentGame());
    } else if (savedStart) {
      dispatch(startNewGame());
    } else {
      dispatch(resetGame());
    }
  }, [dispatch]);

  // Save game state to localStorage whenever `start` or `finish` changes
  useEffect(() => {
    localStorage.setItem('gameStart', start ? 'true' : 'false');
    localStorage.setItem('gameEnd', finish ? 'true' : 'false');
  }, [start, finish]);

  const handleStartGame = () => {
    dispatch(startNewGame());
  };

  return (
    <div className="app">
      <div className="wrapper">
        {/* Render components based on game state */}
        {!start && !finish && (
          <div className="wrapper-start">
            <div className="wrapper-start_content">
              <StartGame onStartGame={handleStartGame} />
            </div>
          </div>
        )}
        {start && !finish && (
          <div className="wrapper-play">
            <div className="wrapper-play_nav">
              <Navbar />
            </div>
            <Moles />
          </div>
        )}
        {finish && (
          <div className="wrapper-finish">
            <EndGame />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
