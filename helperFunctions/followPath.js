


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



function movePacman (gameData, board) {

    let currentPos = gameData.initialPos;
    let futurePos = '';
    let coins = 0;
    
    let results = {}

    console.log('current pos => ', gameData.initalPos)
    console.log('stating to go through the following moves', gameData.moveSet )
    for(var i = 0; i < gameData.moveSet.length; i++){
        // for each move get next moves location
        
        let nextMove = getNextMove(gameData.moveSet[i], currentPos)
        let validMove = checkMove(nextMove, board);  
        let updatedValues = updateValues(validMove, gameData, coins, board);
        
        coins = updatedValues.coins
        currentPos = updatedValues.currentPos
        //console.log('3', updatedValues)
        
    }
    //results = {finalXPos: gameData.currentPos.xPos, finalYPos: gameData.currentPos.yPos, coins: updatedValues};
    
    results = {finalXPos: currentPos.xPos, finalYPos: currentPos.yPos, coins: coins};
   // console.log('the results are !!! ', results)
    return results;
}

function updateValues(move, data, coins, board) {
    console.log(move, 'this is the moves')
    if(move.isValid && move.val === 'coin') {
        data.currentPos = move.coords
        coins += 1;
        board[move.coords.xPos.toString() + move.coords.yPos.toString()] = 'X'
    } else if (move.isValid && move.val === 'X' || move.val === 'start') {
        data.currentPos = move.coords
    } else {
        data.currentPos = data.currentPos;
    }
    return {coins: coins, currentPos: data.currentPos}
}


// is the next move valid

function checkMove(nextMove, board) {
    // console.log(currentPos, 'current Spot')
    // console.log(nextMove, 'next move')
    let space = board[nextMove.newPos.xPos.toString() + nextMove.newPos.yPos.toString()];
    //check the next moves position on the board
    if(space === 'coin') {
        //console.log('you got a coin')
        //space = 'X';
        return {isValid: true, coords: nextMove.newPos, val: space}
    } else if (space === 'wall') {
        //console.log('next is a wall')
        return {isValid: true, coords: nextMove.currentPos, val: space}
    } else if(space === 'X' ) {
        // console.log('already collected this coin');
        return {isValid: true, coords: nextMove.newPos, val: space}
    } else if(space === 'start' ) {
        return {isValid: true, coords: nextMove.newPos, val: space}
    } else {
        //console.log('boundry error')
        return {isValid: false, coords: nextMove.currentPos, val: 'boundry'}
    }
}

// get the coordinates of the next move
function getNextMove (direction, currentPos) {
    console.log('the current pos is ->', currentPos)
    console.log('direction is->', direction);

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