import { useEffect, useState } from 'react';
import './index.css';

function App() {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(verifyWinner, [board]);

  function handleCellClick(index: number) {
    if (winner) {
      // end game
      return;
    }
    if (board[index] !== '') {
      // error alert
      return;
    }
    const updatedBoard = board.map((item, itemIndex) =>
      index === itemIndex ? currentPlayer : item
    );
    setBoard(updatedBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  function verifyWinner() {
    const possibleWaysToWin = [
      // horizontal
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      // vertical
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      // diagonal
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach((cells) => {
      if (cells.every((cell) => cell === 'X')) {
        setWinner('X');
      }
      if (cells.every((cell) => cell === 'O')) {
        setWinner('O');
      }
    });
    checkDraw();
  }

  function checkDraw() {
    if (board.every((items) => items !== '')) {
      setWinner('E');
    }
  }

  function resetGame() {
    setCurrentPlayer('X');
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>
      <div className={`board ${winner && 'game-over'}`}>
        {board.map((item, index) => (
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
      </div>
      {winner && (
        <footer>
          {winner === 'E' ? (
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
            </h2>
          ) : (
            <h2 className="winner-message">
              <span className={winner}>{winner}</span> venceu!
            </h2>
          )}
          <button type="button" onClick={resetGame}>
            Reiniciar
          </button>
        </footer>
      )}
    </main>
  );
}

export default App;
