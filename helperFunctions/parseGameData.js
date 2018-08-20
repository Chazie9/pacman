const Validate = require('./validateData.js');

function parseGameData(rawGameData) {
    // split the valid input data
    let gameData = rawGameData.split('\n');
    if(Validate.hasExtraSpaces(gameData)) {
        return false;
    }

    let board = parseBoard(gameData[0]);
    let initialPos = parseInitialPosition(gameData[1]);
    let moveSet = parseMoveSet(gameData[2]);
    let walls = parseWalls(gameData, board);

    let parsedData = { 
        board: board, 
        initialPos: initialPos,
        moveSet: moveSet,
        walls: walls
    }
    return parsedData;
}

function parseBoard(data) {
    let dataBad = false; 
    let boardData = data.split(' ');
    if(boardData.length > 2) {
        
        return false
    }
    if(boardData[0] < 0 || boardData[1] < 0) {
        console.log('no negs a number!')
        return false
    }
    let area = boardData[0] * boardData[1];

    let board = {
        columns: Number(boardData[0]),
        rows: Number(boardData[1]),
        area: area
    }
    if(dataBad) {
        return false
    }
    return board;
}


function parseInitialPosition(data) {
    let splitData = data.split(' ');
    let initialPos = splitData.join('');
    let xPos = Number(splitData[0]);
    let yPos = Number(splitData[1]);
    

    return { 
        splitData: splitData,
        initialPos: initialPos,
        xPos: xPos,
        yPos: yPos,
        
    }
}

function parseMoveSet(data) {
    let moveSet = data.split('');
    return moveSet;
}

function parseWalls(gameData, board) {
    // Create list of walls on the board
    let walls = {}
    for(var i = 3; i < gameData.length; i++ ) {
        
        let coords = gameData[i].split(' ');
        let key = coords[0].toString()+coords[1].toString();
        
        walls[key] = {
            xPos: coords[0], 
            yPos: coords[1], 
            orginalData: gameData[i] 
        };
    }
    return walls;
}


module.exports.parseGameData = parseGameData