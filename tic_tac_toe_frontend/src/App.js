import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Square({ value, onClick }) {
  return (
    <button 
      className={`square ${value?.toLowerCase()}`} 
      onClick={onClick}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  if (squares.every(square => square)) {
    return 'Draw';
  }
  
  return null;
}

// PUBLIC_INTERFACE
function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  
  // PUBLIC_INTERFACE
  function handleClick(i) {
    const historyCopy = history.slice(0, stepNumber + 1);
    const currentSquares = [...current];

    if (winner || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? 'X' : 'O';
    
    setHistory([...historyCopy, currentSquares]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  }

  let status;
  if (winner === 'Draw') {
    status = "Game ended in a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <div className="game-container">
        <div className="game-header">
          <h1 className="game-title">Tic Tac Toe</h1>
          <div className="game-status">{status}</div>
        </div>

        <Board 
          squares={current}
          onClick={handleClick}
        />

        <div className="game-info">
          <button className="btn reset" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
