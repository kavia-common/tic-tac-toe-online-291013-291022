import React from 'react';
import Square from './Square';
import './Board.css';

/**
 * Board component representing the 3x3 tic-tac-toe grid
 * PUBLIC_INTERFACE
 * @param {Object} props - Component props
 * @param {Array} props.squares - Array of 9 squares
 * @param {function} props.onSquareClick - Click handler for squares
 * @param {Array} props.winningLine - Array of winning square indices
 * @returns {JSX.Element} Board component
 */
function Board({ squares, onSquareClick, winningLine = [] }) {
  return (
    <div className="board" role="grid" aria-label="Tic-tac-toe board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine.includes(index)}
        />
      ))}
    </div>
  );
}

export default Board;
