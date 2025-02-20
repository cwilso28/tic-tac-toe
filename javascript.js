function Player(name, symbol) {
    let score = 0;
    const getScore = () => score;
    const addToScore = () => score++;
    return {name, symbol, getScore, addToScore}
};

function ticTacToeBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push[Cell()];
        }
    }

    function addSymbol(coord, symbol) {
        if (!null) {
            board[coord[0]][coord[1]] = symbol;
        };
    };

    function checkForMatch(array) {
        const arrayIsTheSame = array.every(x => x === array[0])
        return arrayIsTheSame;
    }

    function checkBoardState(board) {
        // Isolate locations to check for wins
        const boardDiag1 = [board[0][0], board[1][1], board[2][2]];
        const boardDiag2 = [board[0][2], board[1][1], board[2][0]];
        const boardArray=[board[0], board[1], board[2], board.map(x => x[0]), board.map(x=>x[1]), board.map(x=>x[2]), boardDiag1, boardDiag2];
        
    }
    return {addSymbol, board}
};

function checkBoardState(board) {
    const boardDiag1 = [board[0][0], board[1][1], board[2][2]];
    const boardDiag2 = [board[0][2], board[1][1], board[2][0]];
    const boardArray=[board[0], board[1], board[2], board.map(x => x[0]), board.map(x=>x[1]), board.map(x=>x[2]), boardDiag1, boardDiag2]
}

const tim = createPlayer("tim", "o");
tim.addToScore();

console.log({playerName: tim.name, score: tim.getScore()})