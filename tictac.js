document.addEventListener("DOMContentLoaded", function () {
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

    let emptyIndices = [];
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === null) emptyIndices.push(i);
    }

    if (emptyIndices.length === 0) return;
    let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    cells[move] = 'O';
    updateBoard();
    endTurn();
  }

  function updateBoard() {
    boardDiv.innerHTML = '';
    for (let i = 0; i < cells.length; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (cells[i]) {
        cell.textContent = cells[i];
        cell.classList.add('taken');
      }
      cell.addEventListener('click', () => handleClick(i));
      boardDiv.appendChild(cell);
    }
  }

  function handleClick(i) {
    if (cells[i] !== null || isGameOver) return;
    cells[i] = 'X';
    updateBoard();
    endTurn();
    if (!isGameOver) {
      setTimeout(aiMove, 300);
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
