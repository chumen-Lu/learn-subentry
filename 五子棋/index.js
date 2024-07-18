document.addEventListener('DOMContentLoaded', () => {
    const SIZE = 15;
    let currentPlayer = 'black';
    let gameBoard = Array(SIZE).fill().map(() => Array(SIZE).fill(null));
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restart');
    const winnerModal = document.getElementById('winnerModal');
    const winnerMessage = document.getElementById('winnerMessage');
    const closeModal = document.querySelector('.close');

    function createBoard() {
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (gameBoard[row][col] || checkWinner()) {
            return;
        }

        gameBoard[row][col] = currentPlayer;
        event.target.classList.add(currentPlayer);

        if (checkWinner()) {
            status.textContent = `Winner: ${currentPlayer === 'black' ? 'Black' : 'White'}`;
            winnerMessage.textContent = `Winner: ${currentPlayer === 'black' ? 'Black' : 'White'}`;
            winnerModal.style.display = 'block';
        } else {
            currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
            status.textContent = `Current Player: ${currentPlayer === 'black' ? 'Black' : 'White'}`;
        }
    }

    function checkWinner() {
        function checkDirection(row, col, rowDir, colDir) {
            let count = 0;
            let r = row;
            let c = col;

            while (r >= 0 && r < SIZE && c >= 0 && c < SIZE && gameBoard[r][c] === currentPlayer) {
                count++;
                r += rowDir;
                c += colDir;
            }

            return count;
        }

        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                if (gameBoard[i][j] === currentPlayer) {
                    if (checkDirection(i, j, 0, 1) + checkDirection(i, j, 0, -1) - 1 >= 5 ||
                        checkDirection(i, j, 1, 0) + checkDirection(i, j, -1, 0) - 1 >= 5 ||
                        checkDirection(i, j, 1, 1) + checkDirection(i, j, -1, -1) - 1 >= 5 ||
                        checkDirection(i, j, 1, -1) + checkDirection(i, j, -1, 1) - 1 >= 5) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function restartGame() {
        gameBoard = Array(SIZE).fill().map(() => Array(SIZE).fill(null));
        currentPlayer = 'black';
        status.textContent = 'Current Player: Black';
        board.innerHTML = '';
        createBoard();
    }

    restartBtn.addEventListener('click', restartGame);

    closeModal.addEventListener('click', () => {
        winnerModal.style.display = 'none';
    });

    // Ensure the modal also closes when the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target == winnerModal) {
            winnerModal.style.display = 'none';
        }
    });

    createBoard();
    const toggleButton = document.getElementById('toggleButton');
  
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
          document.body.classList.toggle('dark-mode');
      });
    } else {
      console.error('The toggle button was not found.');
    }
});
