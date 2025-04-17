const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    checkWinner();
    togglePlayer();
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    let roundWon = false;

    for (let condition of winningCombinations) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        isGameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        isGameActive = false;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusText.textContent = "";
    cells.forEach(cell => (cell.textContent = ""));
}
