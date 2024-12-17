import React, { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Calculate the winner of the game
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check for draw
  const checkDraw = (squares) => {
    return squares.every(square => square !== null);
  };

  // Handle square click
  const handleClick = (index) => {
    if (squares[index] || winner) return; // If the square is already clicked or a winner is found

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const currentWinner = calculateWinner(newSquares);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (checkDraw(newSquares)) {
      setWinner("Draw");
    }
  };

  // Render the squares of the board
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {squares[index]}
      </button>
    );
  };

  // Start a new game (reset the state)
  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <div className="status">
        {winner === "Draw" ? (
          <h2>Draw</h2>
        ) : winner ? (
          <h2>{`Winner: ${winner}`}</h2>
        ) : (
          <h2>{`Next player: ${isXNext ? "X" : "O"}`}</h2>
        )}
      </div>

      {/* Show Restart or Start New Game Button based on winner */}
      <div className="status">
        <button className="start-new-game" onClick={restartGame}>
          {winner ? "Restart Game" : "Start New Game"}
        </button>
      </div>
    </div>
  );
}

export default App;
