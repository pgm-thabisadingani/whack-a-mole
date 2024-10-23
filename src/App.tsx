import React, { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { resetGame, startNewGame } from './redux/reducers/gameSlice';
import { StartGame, Navbar, Moles, EndGame } from './components';

function App() {
  const dispatch: AppDispatch = useDispatch();
  const finish = useSelector((state: RootState) => state.game?.end ?? false);
  const start = useSelector((state: RootState) => state.game?.start ?? false);

  // Reset the game state every time the page reloads
  useEffect(() => {
    console.log('Resetting game on reload.');
    dispatch(resetGame()); // Always reset the game when the app loads
  }, [dispatch]);

  const handleStartGame = () => {
    dispatch(startNewGame());
  };

  return (
    <div className="app">
      <div className="wrapper">
        {/* Render the components based on game state */}
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
