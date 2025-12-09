import React from 'react';
import './Square.css';

/**
 * Square component representing a single cell in the tic-tac-toe board
 * PUBLIC_INTERFACE
 * @param {Object} props - Component props
 * @param {string|null} props.value - 'X', 'O', or null
 * @param {function} props.onClick - Click handler
 * @param {boolean} props.isWinning - Whether this square is part of winning line
 * @returns {JSX.Element} Square component
 */
function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`}
      onClick={onClick}
      aria-label={value ? `Square filled with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}

export default Square;
