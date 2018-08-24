const Validate = require('./validateData.js');

function parseGameData(rawGameData) {
    // split the valid input data
    let gameData = rawGameData.split('\n');

    // remove extra spaces 
    if(Validate.hasExtraSpaces(gameData)) {
        return false;
    }

    let board = parseBoard(gameData[0]);
    let initialPos = parseInitialPosition(gameData[1]);
    let moveSet = parseMoveSet(gameData[2]);
    let walls = parseWalls(gameData, board);
    
    // error checking
    if(!walls || !board || !initialPos) {
        return false;
    }
    // check valid the starting spot is on the board
    if(Validate.validBoardPosition(board, initialPos)) {
        return false;
    }
    // check the starting spot is not a wall
    if(walls[initialPos.initialPos] !== undefined) {
        return false;
    }

    let parsedData = { 
        board: board, 
        initialPos: initialPos,
        moveSet: moveSet,
        walls: walls
    }
    return parsedData;
}

function parseBoard(data) {
    let boardData = data.split(' ');
    // error check
    if(boardData.length > 2) { return false }
    if(boardData[0] < 0 || boardData[1] < 0 || isNaN(boardData[0]) || isNaN(boardData[1])) {
        return false
    }

    let area = boardData[0] * boardData[1];
    let board = {};

    board = {
        visited: {}, 
        xMin: 0,
        xMax: boardData[0] - 1,
        yMin: 0,
        yMax: boardData[1] - 1,
        area: area
    }
    return board;
}

function parseInitialPosition(data) {
    let splitData = data.split(' ');
    if(isNaN(splitData[0]) || isNaN(splitData[1])) {
        return false;
    }
    let initialPos = splitData.join(',');
    let xPos = Number(splitData[0]);
    let yPos = Number(splitData[1]);
    
    return { 
        splitData: splitData,
        initialPos: initialPos,
        xPos: xPos,
        yPos: yPos,
    }
}

// Create list of moves
function parseMoveSet(data) {
    let moveSet = data.split('');
    return moveSet;
}

// Create list of walls to check later
function parseWalls(gameData, board) {
    let walls = {}
    for(var i = 3; i < gameData.length; i++ ) {
        let coords = gameData[i].split(' ');
        // error check
        if(coords.length !== 2) { return false; }
        if(isNaN(coords[0]) || isNaN(coords[1])) {
            return false;
        }
        
        let key = coords[0].toString() + ',' + coords[1].toString();
        walls[key] = {
            xPos: coords[0], 
            yPos: coords[1], 
            orginalData: gameData[i] 
        };
    }
    return walls;
}

module.exports.parseGameData = parseGameData