<style>
  #tictactoe-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    margin-top: 40px;
  }
  .board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
  }
  .cell {
    width: 100px;
    height: 100px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    cursor: pointer;
    border: 2px solid #333;
  }
  .cell.taken {
    cursor: not-allowed;
  }
  #message {
    margin-top: 20px;
    font-size: 1.2em;
  }
  #reset {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 1em;
  }
</style>

<script>
document.addEventListener(\"DOMContentLoaded\", function () {
  const container = document.getElementById('tictactoe-container');
  const boardDiv = document.createElement('div');
  boardDiv.className = 'board';
  boardDiv.id = 'board';
  const messageDiv = document.createElement('div');
  messageDiv.id = 'message';
  const resetBtn = document.createElement('button');
  resetBtn.id = 'reset';
  resetBtn.textContent = 'Restart Game';
  container.appendChild(boardDiv);
  container.appendChild(messageDiv);
  container.appendChild(resetBtn);

  let cells = Array(9).fill(null);
  let isGameOver = false;

  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  function checkWinner(player) {
    return winningCombos.some(combo =>
      combo.every(index => cells[index] === player)
    );
  }

  function checkDraw() {
    return cells.every(cell => cell !== null);
  }

  function aiMove() {
    if (isGameOver) return;

    for (let player of ['O', 'X']) {
      for (let i = 0; i < cells.length; i++) {
        if (cells[i] === null) {
          cells[i] = player;
          if (checkWinner(player)) {
            cells[i] = 'O';
            updateBoard();
            endTurn();
            return;
          }
          cells[i] = null;
        }
      }
    }

    let emptyIndices = cells.map((cell, i) => cell === null ? i : null).filter(i => i !== null);
    if (emptyIndices.length === 0) return;
    let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    cells[move] = 'O';
    updateBoard();
    endTurn();
  }

  function updateBoard() {
    boardDiv.innerHTML = '';
    cells.forEach((value, i) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (value) {
        cell.textContent = value;
        cell.classList.add('taken');
      }
      cell.addEventListener('click', () => handleClick(i));
      boardDiv.appendChild(cell);
    });
  }

  function handleClick(i) {
    if (cells[i] !== null || isGameOver) return;
    cells[i] = 'X';
    updateBoard();
    endTurn();
    if (!isGameOver) {
      setTimeout(aiMove, 500);
    }
  }

  function endTurn() {
    if (checkWinner('X')) {
      messageDiv.textContent = 'You win!';
      isGameOver = true;
    } else if (checkWinner('O')) {
      messageDiv.textContent = 'AI wins!';
      isGameOver = true;
    } else if (checkDraw()) {
      messageDiv.textContent = 'It\'s a draw!';
      isGameOver = true;
    }
  }

  resetBtn.addEventListener('click', () => {
    cells = Array(9).fill(null);
    isGameOver = false;
    messageDiv.textContent = '';
    updateBoard();
  });

  updateBoard();
});
</script>
