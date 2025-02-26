function Player(name, value) {
    let score = 0;
    const getScore = () => score;
    const addToScore = () => score++;
    return {name, value, getScore, addToScore}
};

function ticTacToeBoard() {
    // Set up initial parameters for the board
    const rows = 3;
    const cols = 3;
    const board = [];

    let gameContainer = document.getElementById("game-container");

    // Generate array used to store the values of the board. The Cell object will help control the values in the board.
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            let cell = Cell(i, j);
            board[i].push(cell);
            gameContainer.appendChild(cell.createButton())
        }
    }

    // This function controls the value that goes into the cell in the grid, so long as the value is zero.
    function placeMarker(row, column, player) {
        if (board[row][column].getValue() != 0) {
            return;
        }
        else {
            board[row][column].setValue(player)
        }
    };

    // This displays the board in the console or on the webpage
    function viewBoard() {
        const boardWithValues = board.map((row) => row.map((cell) => cell.updateButton()))
        // console.log(boardWithValues)
    }

    // This checks if an array contains all the same values
    function checkForMatch(array) {
        if (!array.map((element) => element.getValue()).includes(0)) {
            const arrayIsTheSame = array.every((element) => element.getValue() === array[0].getValue());
            return arrayIsTheSame;
        };
    };

    // This checks all of the winning array configurations for matching values within those arrays. It passes a true value if a value is found
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
    let resetButton = document.getElementById("reset-button");
    let submitButton = document.getElementById("submit-button")
    let player1_name = document.getElementById("player1");
    let player2_name = document.getElementById("player2");
    
    const default1 = "Player 1";
    const default2 = "Player 2";

    player1_name.value = default1;
    player2_name.value = default2;
    
    const player1 = Player(player1_name.value,1);
    const player2 = Player(player2_name.value,2);

    let currentPlayer = player1;

    const switchPlayer = () => currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;

    function startNewGame() {
        gameContainer.textContent='';
        board = ticTacToeBoard();
        round = 0;
        board.viewBoard();
        currentPlayer = player1;
        header.textContent = `${currentPlayer.name}, it's your turn!`;
    }

    function playRound(row, column) {
        board.placeMarker(row, column, currentPlayer.value);
        board.viewBoard();
        let boardState = board.checkBoardState();
        let boardButtons = gameContainer.querySelectorAll("button");
        if (boardState === 1) {
            endGameStatus.textContent = `${currentPlayer.name} wins!`;
            boardButtons.forEach((button) => button.disabled = true);
            // startNewGame();
        }

        else if ((boardState === 0) & (round === 8)) {
            endGameStatus.textContent = `Draw!`;
            // startNewGame();
        }

        else {
            round++;
            switchPlayer();
            header.textContent = `${currentPlayer.name}, it's your turn!`;
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
            player1.name = default1;
            player2.name = default2;
            player1_name.value = default1;
            player2_name.value = default2;
            endGameStatus.textContent = '';
            startNewGame();
        }
    }

    function submitNames(e) {
        if (e.target && e.target.matches('#submit-button')) {
            player1.name = document.getElementById("player1").value
            player2.name = document.getElementById("player2").value
            startNewGame();
        }
    }
    
    resetButton.addEventListener("click", function(e) {
        resetGame(e);
    })

    submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        submitNames(e);
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