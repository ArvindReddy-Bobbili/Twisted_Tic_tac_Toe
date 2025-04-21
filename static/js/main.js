(() => {
  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('reset');

  let board, currentPlayer, moves, flashIndex, gameOver, isAnimating;

  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function init() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    moves = { X: [], O: [] };
    flashIndex = { X: null, O: null };
    gameOver = false;
    isAnimating = false;
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleClick);
      boardEl.appendChild(cell);
    }
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
    if (moves[currentPlayer].length === 3) {
      const oldIdx = moves[currentPlayer][0];
      flashIndex[currentPlayer] = oldIdx;
      const cell = boardEl.querySelector(`.cell[data-index="${oldIdx}"]`);
      cell.classList.add('flashing');
    }
  }

  function handleClick(e) {
    if (gameOver || isAnimating) return;
    const idx = parseInt(e.target.dataset.index, 10);
    if (board[idx] !== '') return;
    if (flashIndex[currentPlayer] !== null && idx === flashIndex[currentPlayer]) return;
    const playerMoves = moves[currentPlayer];
    if (playerMoves.length < 3) {
      placeMark(idx);
      postMove();
    } else if (playerMoves.length === 3) {
      const oldIdx = playerMoves[0];
      flashIndex[currentPlayer] = oldIdx;
      const oldCell = boardEl.querySelector(`.cell[data-index="${oldIdx}"]`);
      oldCell.classList.add('flashing');
      isAnimating = true;
      setTimeout(() => {
        oldCell.classList.remove('flashing');
        board[oldIdx] = '';
        oldCell.textContent = '';
        playerMoves.shift();
        flashIndex[currentPlayer] = null;
        placeMark(idx);
        postMove();
        isAnimating = false;
      }, 500);
    }
  }

  function placeMark(idx) {
    board[idx] = currentPlayer;
    const cell = boardEl.querySelector(`.cell[data-index="${idx}"]`);
    cell.textContent = currentPlayer;
    moves[currentPlayer].push(idx);
  }

  function postMove() {
    if (checkWin()) {
      statusEl.textContent = `Player ${currentPlayer} wins!`;
      gameOver = true;
      return;
    }
    if (board.every(cell => cell !== '')) {
      statusEl.textContent = 'Tie!';
      gameOver = true;
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
    if (moves[currentPlayer].length === 3) {
      const oldIdx = moves[currentPlayer][0];
      flashIndex[currentPlayer] = oldIdx;
      const cell = boardEl.querySelector(`.cell[data-index="${oldIdx}"]`);
      cell.classList.add('flashing');
    }
  }

  function checkWin() {
    return winningCombos.some(combo =>
      combo.every(i => board[i] === currentPlayer)
    );
  }

  resetBtn.addEventListener('click', init);
  init();
})();
