import React from 'react';
import './GameControls.css';

/**
 * GameControls component for game mode selection and actions
 * PUBLIC_INTERFACE
 * @param {Object} props - Component props
 * @param {string} props.mode - Current game mode ('PvP' or 'PvC')
 * @param {function} props.onModeChange - Mode change handler
 * @param {function} props.onNewGame - New game handler
 * @param {function} props.onReset - Reset history handler
 * @param {boolean} props.gameActive - Whether a game is currently active
 * @returns {JSX.Element} GameControls component
 */
function GameControls({ mode, onModeChange, onNewGame, onReset, gameActive }) {
  return (
    <div className="game-controls">
      <div className="mode-selector">
        <label htmlFor="mode-select">Game Mode:</label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
          disabled={gameActive}
          className="mode-select"
        >
          <option value="PvP">Player vs Player</option>
          <option value="PvC">Player vs Computer</option>
        </select>
      </div>
      <div className="control-buttons">
        <button
          className="btn btn-primary"
          onClick={onNewGame}
          aria-label="Start new game"
        >
          New Game
        </button>
        <button
          className="btn btn-secondary"
          onClick={onReset}
          aria-label="Reset game history"
        >
          Reset History
        </button>
      </div>
    </div>
  );
}

export default GameControls;
