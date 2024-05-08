document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restart-btn');
    const resultScreen = document.getElementById('result-screen');
    const resultText = document.getElementById('result-text');
    const newGameBtns = document.querySelectorAll('.new-game-btn');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false;
                resultText.textContent = `Player ${gameState[a]} wins!`;
                resultScreen.style.display = 'flex';
            }
        }
        if (!gameState.includes('') && gameActive) {
            gameActive = false;
            resultText.textContent = 'It\'s a draw!';
            resultScreen.style.display = 'flex';
        }
    };

    const handleCellClick = (index) => {
        if (gameState[index] || !gameActive) return;
        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    };

    const restartGame = () => {
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        gameActive = true;
        currentPlayer = 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
        resultScreen.style.display = 'none';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    restartBtn.addEventListener('click', restartGame);
    newGameBtns.forEach(btn => btn.addEventListener('click', restartGame));
});
