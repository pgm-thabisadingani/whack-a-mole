import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { resetGame, startNewGame } from '../../redux/reducers/gameSlice';
import { saveUserData, fetchScores } from '../../supabase/supabaseService';

import FinalScoreModal from '../finalScoreModal/FinalScoreModal';
import './endGame.scss';
import Button from '../button/Button';

const EndGame = () => {
  const dispatch: AppDispatch = useDispatch();
  const score = useSelector((state: RootState) => state.game.score);
  const currentUser = useSelector((state: RootState) => state.user.name);
  const userId = useSelector((state: RootState) => state.user.id);

  const [leaderboard, setLeaderboard] = useState<
    { name: string; score: number; userId: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showFinalScore, setShowFinalScore] = useState(false);
  const [userPosition, setUserPosition] = useState<number | null>(null);
  const [isFirstPlace, setIsFirstPlace] = useState(false);
  const [personalBest, setPersonalBest] = useState<number | null>(null);

  // Function to load leaderboard data
  const loadLeaderboard = async () => {
    try {
      setIsLoading(true);

      const updatedScores = await fetchScores();
      setLeaderboard(updatedScores || []);

      // Find the user's previous best score from the leaderboard
      const existingUser =
        updatedScores?.find((user) => user.userId === userId) || null;
      if (existingUser) {
        setPersonalBest(existingUser.score);
      }

      // Calculate position based on current score
      const currentScorePosition =
        updatedScores?.filter((user) => user.score > score).length + 1 || null;
      setUserPosition(currentScorePosition);
      setIsFirstPlace(currentScorePosition === 1);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to update leaderboard. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save user score and update leaderboard when game ends
  useEffect(() => {
    const updateUserScore = async () => {
      if (!currentUser || score === null || score === undefined || isSaved) {
        return;
      }

      try {
        // Save the user's score only if it's higher than the previous score
        if (!isSaved && (!personalBest || score > personalBest)) {
          await saveUserData(userId, currentUser, score);
          setIsSaved(true);
        }

        // Fetch the leaderboard after saving the score

        await loadLeaderboard();

        // Show final score modal after the leaderboard is updated
        setShowFinalScore(true);
      } catch (err) {
        console.error(
          'Error updating user score or fetching leaderboard:',
          err
        );
        setError('Failed to update leaderboard. Please try again.');
      }
    };

    updateUserScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, currentUser, isSaved, userId, personalBest]);

  const sortedLeaderboard =
    leaderboard.length > 0
      ? leaderboard.slice(0, 10).map((user, i) => (
          <li
            key={i}
            className={
              user.userId === userId
                ? 'active scoreboard-list_item'
                : 'scoreboard-list_item'
            }
          >
            <span className="user-name">{user.name}</span>
            <span className="user-score">{user.score}</span>
          </li>
        ))
      : null;

  const handleCloseModal = async () => {
    setShowFinalScore(false);
    await loadLeaderboard();
  };

  const handleStartNewGame = () => {
    setLeaderboard([]);
    setIsSaved(false);
    setShowFinalScore(false);
    setUserPosition(null);
    setIsFirstPlace(false);
    dispatch(startNewGame());
  };

  const handleQuitGame = () => {
    localStorage.clear();
    dispatch(resetGame());
  };

  return (
    <div className="endGame">
      <h2>⭐Top 10 Scores⭐</h2>
      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <>
          {leaderboard.length === 0 && !isLoading && <p>No scores yet!</p>}
          <ul className="endGame-list">{sortedLeaderboard}</ul>
        </>
      )}
      <div className="buttons-container">
        <Button onClick={handleStartNewGame} className="btn btn-finish">
          Play Again
        </Button>
        <Button onClick={handleQuitGame} className="btn btn-endGame">
          Quit
        </Button>
      </div>
      {showFinalScore && (
        <FinalScoreModal
          score={score}
          position={userPosition}
          personalBest={personalBest}
          isFirstPlace={isFirstPlace}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EndGame;
