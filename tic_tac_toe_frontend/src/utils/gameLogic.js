/**
 * Game logic utilities for tic-tac-toe
 * Provides pure functions for game state management
 */

/**
 * Calculate winner from current board state
 * PUBLIC_INTERFACE
 * @param {Array} squares - Array of 9 squares representing the board
 * @returns {Object|null} - { winner: 'X'|'O', line: [indices] } or null
 */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }
  return null;
}

/**
 * Check if the game is a draw
 * PUBLIC_INTERFACE
 * @param {Array} squares - Array of 9 squares representing the board
 * @returns {boolean} - true if draw, false otherwise
 */
export function isDraw(squares) {
  return squares.every(square => square !== null) && !calculateWinner(squares);
}

/**
 * Get a random valid move for the AI
 * PUBLIC_INTERFACE
 * @param {Array} squares - Array of 9 squares representing the board
 * @returns {number|null} - Index of the move or null if no valid moves
 */
export function getRandomAIMove(squares) {
  const emptySquares = squares
    .map((square, index) => (square === null ? index : null))
    .filter(index => index !== null);

  if (emptySquares.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
}

/**
 * Validate if a move is valid
 * PUBLIC_INTERFACE
 * @param {Array} squares - Array of 9 squares representing the board
 * @param {number} index - Index to validate
 * @returns {boolean} - true if move is valid, false otherwise
 */
export function isValidMove(squares, index) {
  return index >= 0 && index < 9 && squares[index] === null;
}
