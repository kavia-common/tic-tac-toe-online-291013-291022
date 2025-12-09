import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import GameControls from './components/GameControls';
import GameHistory from './components/GameHistory';
import { calculateWinner, isDraw, getRandomAIMove, isValidMove } from './utils/gameLogic';

/**
 * Main App component for tic-tac-toe game
 * PUBLIC_INTERFACE
 * @returns {JSX.Element} App component
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [mode, setMode] = useState('PvP');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameActive, setGameActive] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect to handle computer move in PvC mode
  useEffect(() => {
    if (mode === 'PvC' && currentPlayer === 'O' && !winner && gameActive) {
      const timer = setTimeout(() => {
        const aiMove = getRandomAIMove(board);
        if (aiMove !== null) {
          handleSquareClick(aiMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, mode, winner, board, gameActive]);

  /**
   * Toggle theme between light and dark
   * PUBLIC_INTERFACE
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * Handle square click
   * PUBLIC_INTERFACE
   * @param {number} index - Index of the clicked square
   */
  const handleSquareClick = (index) => {
    // Prevent clicks if game is over or square is filled
    if (winner || !isValidMove(board, index)) {
      return;
    }

    // Prevent human click when it's computer's turn
    if (mode === 'PvC' && currentPlayer === 'O') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoveCount(moveCount + 1);
    setGameActive(true);

    // Check for winner
    const winResult = calculateWinner(newBoard);
    if (winResult) {
      setWinner(winResult.winner);
      setWinningLine(winResult.line);
      addToHistory(winResult.winner, moveCount + 1);
      setGameActive(false);
      return;
    }

    // Check for draw
    if (isDraw(newBoard)) {
      setWinner('draw');
      addToHistory('draw', moveCount + 1);
      setGameActive(false);
      return;
    }

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  /**
   * Add game result to history
   * PUBLIC_INTERFACE
   * @param {string} result - Game result ('X', 'O', or 'draw')
   * @param {number} moves - Number of moves in the game
   */
  const addToHistory = (result, moves) => {
    const gameRecord = {
      result,
      moves,
      date: new Date().toISOString(),
      mode: mode === 'PvP' ? 'Player vs Player' : 'Player vs Computer',
    };
    setHistory([gameRecord, ...history]);
  };

  /**
   * Start a new game
   * PUBLIC_INTERFACE
   */
  const handleNewGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
    setMoveCount(0);
    setGameActive(false);
  };

  /**
   * Reset game history
   * PUBLIC_INTERFACE
   */
  const handleReset = () => {
    setHistory([]);
    handleNewGame();
  };

  /**
   * Change game mode
   * PUBLIC_INTERFACE
   * @param {string} newMode - New game mode ('PvP' or 'PvC')
   */
  const handleModeChange = (newMode) => {
    setMode(newMode);
    handleNewGame();
  };

  /**
   * Get status message
   * PUBLIC_INTERFACE
   * @returns {string} Status message
   */
  const getStatus = () => {
    if (winner === 'draw') {
      return "It's a draw!";
    }
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (mode === 'PvC' && currentPlayer === 'O') {
      return 'Computer is thinking...';
    }
    return `Current player: ${currentPlayer}`;
  };

  return (
    <div className="App">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      
      <div className="game-container">
        <header className="game-header">
          <h1 className="game-title">Tic-Tac-Toe</h1>
          <p className="game-subtitle">Ocean Professional Edition</p>
        </header>

        <div className="status-message">
          <p className={winner ? 'status-winner' : 'status-playing'}>
            {getStatus()}
          </p>
        </div>

        <Board
          squares={board}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />

        <GameControls
          mode={mode}
          onModeChange={handleModeChange}
          onNewGame={handleNewGame}
          onReset={handleReset}
          gameActive={gameActive}
        />

        <GameHistory history={history} />
      </div>
    </div>
  );
}

export default App;
