// function Player(name, symbol) {
//     let score = 0;
//     const getScore = () => score;
//     const addToScore = () => score++;
//     return {name, symbol, getScore, addToScore}
// };

function ticTacToeBoard() {
    const rows = 3;
    const cols = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    function placeMarker(row, column, player) {
        if (board[row][column].getValue() != 0) {
            return;
        }
        else {
            board[row][column].setValue(player)
        }
    };

    function viewBoard() {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithValues)
    }

    function checkForMatch(array) {
        if (!array.map((element) => element.getValue()).includes(0)) {
            const arrayIsTheSame = array.every((element) => element.getValue() === array[0].getValue());
            return arrayIsTheSame;
        };
    };

    function checkBoardState() {
        // Isolate locations to check for wins
        const boardDiag1 = [board[0][0], board[1][1], board[2][2]];
        const boardDiag2 = [board[0][2], board[1][1], board[2][0]];
        const boardArray=[board[0], board[1], board[2], board.map((x) => x[0]), board.map((x)=>x[1]), board.map((x)=>x[2]), boardDiag1, boardDiag2];
        
        let boardState = boardArray.map(checkForMatch);

        let winIndex = boardState.indexOf(true);

        if (winIndex >= 0) {
            return 1;
        }

        else {
            return 0;
        }
    }
    return {placeMarker, viewBoard, checkBoardState}
};

function Cell() {
    let value = 0;

    const setValue = (player) => value = player;
    
    const getValue = () => value;

    return {setValue, getValue}
};

function gameController() {
    let board;
    let round = 0;
    
    const player1 = 1;
    const player2 = 2;

    let currentPlayer = player1;

    const switchPlayer = () => currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;

    function startNewGame() {
        board = ticTacToeBoard();
        round = 0;
        board.viewBoard();
        currentPlayer = player1;
    }

    function playRound(row, column) {
        // console.log(currentPlayer);
        board.placeMarker(row, column, currentPlayer);
        board.viewBoard();
        let boardState = board.checkBoardState();
        if (boardState === 1) {
            console.log(`Player ${currentPlayer} wins!`);
            startNewGame();
        }

        else if ((boardState === 0) & (round === 8)) {
            console.log('Draw');
            startNewGame();
        }

        else {
            round++;
            switchPlayer();
        }
        
    }

    return {startNewGame,playRound}
};

// *** Tests to verify the code works ***
// *** Verify values are placed correctly ***
const row = 3;
const col = 3;
// let index = 1;
// testBoard = ticTacToeBoard();


// for (let i = 0; i < 3; i++) {
//     for (let j=0; j <3; j++) {
//         testBoard.placeMarker(i, j, index);
//         index++;        
//     }
// }

// testBoard.viewBoard()

// *** Verify that win conditions are found ***
winConditionBoard = ticTacToeBoard();

// *** Column 1 test ***
// for (let i = 0; i < row; i++) {
//     winConditionBoard.placeMarker(i,i,1);
//     winConditionBoard.checkBoardState();
// }

// winConditionBoard.viewBoard()

// *** Test the game controller functionality ***
const game = gameController();
game.startNewGame();

// *** Check if the correct response is generated in the event of a draw or win ***
gameDraw = [[0,0], [1,1], [0, 1], [0,2],[2,0],[1,0], [1,2], [2, 1], [2, 2]];

p1Win = [[0,2], [1,1], [0,1],[2,2],[0,0]];

p2Win = [[0,0],[0,1],[0,2],[1,1],[2,2],[2,1]];

function playGame(array) {
    for (let i = 0; i<array.length; i++) {
        game.playRound(array[i][0], array[i][1]);
    }
};

playGame(p2Win)