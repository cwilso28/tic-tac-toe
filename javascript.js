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

    let gameContainer = document.getElementById("game-container");

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            let cell = Cell(i, j);
            board[i].push(cell);
            gameContainer.appendChild(cell.createButton())
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
        const boardWithValues = board.map((row) => row.map((cell) => cell.updateButton()))
        // console.log(boardWithValues)
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

function Cell(row, column) {
    this.row = row;
    this.column = column;

    let value = 0;

    const setValue = (player) => value = player;
    
    const getValue = () => value;

    const xImg = document.createElement("img");
    xImg.src = "resources/x-symbol-svgrepo-com.svg";
    xImg.alt = "X marker"
    xImg.draggable = false;

    const oImg = document.createElement("img");
    oImg.src = "resources/circle-svgrepo-com.svg";
    oImg.alt = "O marker";
    oImg.draggable = false;

    let button;

    function createButton() {
        button = document.createElement("button");
        button.type = "button";
        button.id = "board-button"
        // button.textContent = value;
        button.setAttribute("row", row);
        button.setAttribute("column", column);
        return button;
    }

    const updateButton = () => {
        symbols = ['',xImg, oImg];
        // console.log(symbols[value-1])
        button.append(symbols[value]);
    }

    return {setValue, getValue, createButton, updateButton}
};

function gameController() {
    let board;
    let round = 0;

    let gameContainer = document.getElementById("game-container");
    let header = document.querySelector("h1");
    let endGameStatus = document.querySelector("h2");
    let controlsContainer = document.getElementById("controls-container")
    
    const player1 = 1;
    const player2 = 2;

    let currentPlayer = player1;

    const switchPlayer = () => currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;

    function startNewGame() {
        gameContainer.textContent='';
        board = ticTacToeBoard();
        round = 0;
        board.viewBoard();
        currentPlayer = player1;
        header.textContent = `Player ${currentPlayer}, it's your turn!`;
    }

    function playRound(row, column) {
        board.placeMarker(row, column, currentPlayer);
        board.viewBoard();
        let boardState = board.checkBoardState();
        if (boardState === 1) {
            endGameStatus.textContent = `Player ${currentPlayer} wins!`;
            // startNewGame();
        }

        else if ((boardState === 0) & (round === 8)) {
            endGameStatus.textContent = `Draw!`;
            // startNewGame();
        }

        else {
            round++;
            switchPlayer();
            header.textContent = `Player ${currentPlayer}, it's your turn!`;
        }
        
    }

    function buttonClick(e) {
        if (e.target && e.target.matches("#board-button")) {
            const selectedButton = e.target;
            const row = Number(selectedButton.getAttribute("row"));
            const column = Number(selectedButton.getAttribute("column"));

            playRound(row, column);
            selectedButton.disabled = true;
        }
    }

    function resetGame(e) {
        if (e.target && e.target.matches('#reset-button')) {
            endGameStatus.textContent = '';
            startNewGame();
        }
    }
    
    controlsContainer.addEventListener("click", function(e) {
        resetGame(e);
    })

    gameContainer.addEventListener("click", function(e) {
        buttonClick(e);
    });

    return {startNewGame,playRound}

    
};


const game = gameController();
game.startNewGame();


// *** Tests to verify the code works ***
// *** Verify values are placed correctly ***
// const row = 3;
// const col = 3;
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
// winConditionBoard = ticTacToeBoard();

// *** Column 1 test ***
// for (let i = 0; i < row; i++) {
//     winConditionBoard.placeMarker(i,i,1);
//     winConditionBoard.checkBoardState();
// }

// winConditionBoard.viewBoard()

// *** Test the game controller functionality ***

// *** Check if the correct response is generated in the event of a draw or win ***
// gameDraw = [[0,0], [1,1], [0, 1], [0,2],[2,0],[1,0], [1,2], [2, 1], [2, 2]];

// p1Win = [[0,2], [1,1], [0,1],[2,2],[0,0]];

// p2Win = [[0,0],[0,1],[0,2],[1,1],[2,2],[2,1]];

// function playGame(array) {
//     for (let i = 0; i<array.length; i++) {
//         game.playRound(array[i][0], array[i][1]);
//     }
// };

// playGame(p2Win)