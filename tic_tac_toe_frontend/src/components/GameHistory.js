import React from 'react';
import './GameHistory.css';

/**
 * GameHistory component displaying past game results
 * PUBLIC_INTERFACE
 * @param {Object} props - Component props
 * @param {Array} props.history - Array of past game records
 * @returns {JSX.Element} GameHistory component
 */
function GameHistory({ history }) {
  if (history.length === 0) {
    return (
      <div className="game-history">
        <h2>Game History</h2>
        <p className="no-history">No games played yet. Start a new game!</p>
      </div>
    );
  }

  return (
    <div className="game-history">
      <h2>Game History</h2>
      <div className="history-list">
        {history.map((game, index) => (
          <div key={index} className="history-item">
            <div className="history-header">
              <span className="game-number">Game #{history.length - index}</span>
              <span className="game-date">
                {new Date(game.date).toLocaleString()}
              </span>
            </div>
            <div className="history-result">
              {game.result === 'draw' ? (
                <span className="result-draw">Draw</span>
              ) : (
                <span className={`result-winner result-${game.result}`}>
                  Winner: {game.result}
                </span>
              )}
            </div>
            <div className="history-details">
              <span className="move-count">Moves: {game.moves}</span>
              <span className="game-mode">{game.mode}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameHistory;
