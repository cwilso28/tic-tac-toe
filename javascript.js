function createPlayer(name, symbol) {
    let score = 0;
    const getScore = () => score;
    const addToScore = () => score++;
    return {name, symbol, getScore, addToScore}
}

function ticTacToeBoard() {
    let board = [[null, null, null],[null, null, null],[null, null, null]];

    function addSymbol(coord, symbol) {
        board[coord[0]][coord[1]] = symbol;
    }
    return {addSymbol, board}
}

const tim = createPlayer("tim", "o");
tim.addToScore();

console.log({playerName: tim.name, score: tim.getScore()})