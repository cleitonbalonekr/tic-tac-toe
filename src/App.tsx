import { useEffect, useState } from 'react';
import './index.css';

enum PlayerSymbol {
  PLAYER1 = 'X',
  PLAYER2 = 'O',
  DRAW = 'E',
}

function App() {
  const emptyBoard = Array(9).fill('');
  const [board, setBoard] = useState(emptyBoard);
  const [history, setHistory] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(PlayerSymbol.PLAYER1);
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
    setCurrentPlayer(
      currentPlayer === PlayerSymbol.PLAYER1
        ? PlayerSymbol.PLAYER2
        : PlayerSymbol.PLAYER1
    );
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
      if (cells.every((cell) => cell === PlayerSymbol.PLAYER1)) {
        setWinner(PlayerSymbol.PLAYER1);
        setHistory([...history, PlayerSymbol.PLAYER1]);
      }
      if (cells.every((cell) => cell === PlayerSymbol.PLAYER2)) {
        setWinner(PlayerSymbol.PLAYER2);
        setHistory([...history, PlayerSymbol.PLAYER2]);
      }
    });
    checkDraw();
  }

  function checkDraw() {
    if (board.every((items) => items !== '')) {
      setWinner(PlayerSymbol.DRAW);
      setHistory([...history, PlayerSymbol.DRAW]);
    }
  }

  function resetGame() {
    const random = Math.random() * 100;
    const nextPlayer =
      random > 50 ? PlayerSymbol.PLAYER1 : PlayerSymbol.PLAYER2;
    console.log('random', random);
    console.log('nextPlayer', nextPlayer);
    setCurrentPlayer(nextPlayer);
    setBoard(emptyBoard);
    setWinner(null);
  }

  function getTotalVictory(player: PlayerSymbol) {
    return history.filter((hist) => hist === player).length;
  }

  return (
    <main>
      <div className="game">
        <h1 className="title">Jogo da Velha</h1>
        <h3>Vez do Jogador {currentPlayer}</h3>
        {winner && (
          <header>
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
          </header>
        )}
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
      </div>
      <aside>
        <h2>Placar</h2>
        <header>
          <p>
            <span className={PlayerSymbol.PLAYER1}>
              Jogador {PlayerSymbol.PLAYER1}:{' '}
            </span>
            {getTotalVictory(PlayerSymbol.PLAYER1)}
          </p>
          x
          <p>
            <span className={PlayerSymbol.PLAYER2}>
              Jogador {PlayerSymbol.PLAYER2}:{' '}
            </span>
            {getTotalVictory(PlayerSymbol.PLAYER2)}:
          </p>
          |
          <span className={PlayerSymbol.DRAW}>
            Empate {PlayerSymbol.DRAW}: {getTotalVictory(PlayerSymbol.DRAW)}
          </span>
        </header>
        <div>
          <h4>Histórico</h4>
        </div>
        {history.map((item, index) => (
          <p key={index} className={item}>
            Round {index + 1} - Vencedor = {item}
          </p>
        ))}
      </aside>
    </main>
  );
}

export default App;
