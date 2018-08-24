// Avaliable data in data
//  let data = { 
//     boardSize: {
//           rows: boardSize[1],
//           columns: boardSize[0]
//     initalPos: {
//            splitData: splitData,
//            startingPos: startingPos,
//            xPos: xPos,
//            yPos: yPos
//        }, 
//     moveSet: moveSet, type array of strings
//     walls: { yPos: 4, xPos: 4, orginalData: gameData[i] }
// }

const Validate = require('./validateData');
function movePacman (gameData) {
    
    let currentPos = gameData.initialPos;
    let futurePos = '';
    let coins = 0;
    let results = {};

    for(var i = 0; i < gameData.moveSet.length; i++){
        // for each move, get next moves location, validate it, if valid update it
        let nextMove = getNextMove(gameData.moveSet[i], currentPos)
        let validMove = checkMove(nextMove, gameData);  
        let updatedValues = updateValues(validMove, gameData, coins);
       
        coins = updatedValues.coins
        currentPos = updatedValues.currentPos
    }

    results = {finalXPos: currentPos.xPos, finalYPos: currentPos.yPos, coins: coins};
    return results;
}

function updateValues(move, data, coins) {
    if(move.isValid && move.val === 'X') {
        data.currentPos = move.coords 
    }
    if(move.isValid && move.val === 'coin') {
        data.currentPos = move.coords
        coins += 1;
        data.board.visited[move.coords.xPos.toString() + ',' + move.coords.yPos.toString()] = 'X';
    }
    return {coins: coins, currentPos: data.currentPos}
}

// is the next move valid
function checkMove(nextMove, data) {
    let walls = data.walls;
   
    //check to see if the next location is a wall 
    let nextCoordString = nextMove.newPos.xPos.toString() + ',' + nextMove.newPos.yPos.toString()
    if(walls[nextCoordString] !== undefined) {
        return {isValid: true, coords: nextMove.currentPos, val: 'X'}
    } 

    // if the coord has been visited before, move forward, but dont collect a coin
    if(data.board.visited[nextCoordString] !== undefined) {
        return {isValid: true, coords: nextMove.newPos, val: 'X'}
    }

    // if next coord is the starting spot dont collect a coin
    if(nextCoordString === data.initialPos.initialPos) {
        return {isValid: true, coords: nextMove.newPos, val: 'X'}
    }

    //check next move aganist board boundry
    let newX = nextMove.newPos.xPos;
    let newY = nextMove.newPos.yPos;
    if(newX > data.board.xMax || newX < 0 || newY > data.board.yMax || newY < 0) {
        return {isValid: true, coords: nextMove.currentPos, val: 'X'}
    }

    return {isValid: true, coords: nextMove.newPos, val: 'coin'}
}

// get the coordinates of the next move
function getNextMove (direction, currentPos) {
    let newPos = { 
        xPos: currentPos.xPos,
        yPos: currentPos.yPos
    }

    if (direction === 'N') {
        newPos.yPos += 1
    } else if ( direction === 'E') {
        newPos.xPos = newPos.xPos + 1
    } else if( direction === 'S') {
        newPos.yPos = newPos.yPos - 1
    } else if( direction === 'W') {
      newPos.xPos = newPos.xPos - 1
    } else {
        // handle error
        console.log('error')
    }
    return { newPos: newPos, currentPos: currentPos };
}

module.exports.movePacman = movePacman;