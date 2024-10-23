import React, { FC } from 'react';
import './finalScoreModal.scss';

type FinalScoreModalProps = {
  score: number;
  position: number | null;
  personalBest: number | null;
  isFirstPlace: boolean;
  onClose: () => void;
};

const FinalScoreModal: FC<FinalScoreModalProps> = ({
  score,
  position,
  isFirstPlace,
  personalBest,
  onClose,
}) => {
  const isNewPersonalBest =
    personalBest !== null && score > personalBest && score > 0;

  return (
    <div className="finalScoreModal-overlay">
      <div className="finalScoreModal">
        {isFirstPlace ? (
          <>
            <div className="trophy">
              🏆 Congratulations, 1st place! 🏆
              <p>Your score: {score}</p>
            </div>
          </>
        ) : (
          <>
            <h2>Your Final Score</h2>
            <p>Your score: {score}</p>

            {/* Check if the user scored zero */}
            {score === 0 ? (
              <>
                <p>
                  Don't give up! Give it another try to climb the leaderboard.
                </p>
                <p>Your personal best: {personalBest}</p>
              </>
            ) : personalBest !== null && score < personalBest ? (
              <p>Your personal best: {personalBest}</p>
            ) : isNewPersonalBest ? (
              <>
                <h3>🎉 New Personal Best! 🎉</h3>
                <p>You've beaten your personal best with a score of {score}!</p>
                <p>Your position is: {position}</p>
              </>
            ) : (
              <p>Your position is: {position}</p>
            )}
          </>
        )}

        <button onClick={onClose} className="close-modal">
          Close
        </button>
      </div>
    </div>
  );
};

export default FinalScoreModal;
