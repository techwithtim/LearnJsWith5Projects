const prompt = require("prompt-sync")()

function makeMove(turn, board) {
    while (true) {
        const row = parseInt(prompt("Enter row: "))
        const col = parseInt(prompt("Enter col: "))

        if (isNaN(row) || row < 1 || row > 3) console.log('Invalid row.')
        else if (isNaN(col) || col < 1 || col > 3) console.log("Invalid column.")
        else if (board[row - 1][col - 1] !== " ") console.log("Invalid position.")
        else {
            board[row - 1][col - 1] = turn
            break
        }
    }
}

function printBoard(board) {
    for (let i = 0; i < board.length; i++) {
        const row = board[i]
        let rowString = ""
        for (let j = 0; j < row.length; j++) {
            rowString += row[j]
            if (j !== row.length - 1) rowString += " | "
        }
        console.log(rowString)
        if (i !== board.length - 1) console.log("----------")
    }
}

function checkWin(board, turn) {
    const lines = [
        [[0, 0], [0, 1], [0, 2]], // row 0
        [[1, 0], [1, 1], [1, 2]], // row 1
        [[2, 0], [2, 1], [2, 2]], // row 2
        [[0, 0], [1, 0], [2, 0]], // col 0
        [[0, 1], [1, 1], [2, 1]], // col 1
        [[0, 2], [1, 2], [2, 2]], // col 2
        [[0, 0], [1, 1], [2, 2]], // diagonal 1
        [[0, 2], [1, 1], [2, 0]] // diagonal 2
    ]
    for (let line of lines) {
        let win = true;
        for (let pos of line) {
            const [row, col] = pos
            if (board[row][col] !== turn) {
                win = false
                break
            }
        }
        if (win) return true
    }
    return false
}

const board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
]

let turn = "X";
let turnCount = 0;
let win = false;

printBoard(board)
console.log()

while (turnCount < 9) {
    console.log(turn, "players turn.")
    makeMove(turn, board)
    printBoard(board)
    console.log()
    win = checkWin(board, turn)
    if (win) {
        console.log(turn, "has won!")
        break;
    }

    if (turn === "X") turn = "O"
    else turn = "X"
    turnCount++;
}

if (!win) console.log("Tie game!")