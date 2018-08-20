

//let data = { 
    //     boardSize: {
    //           rows: boardSize[1],
    //           columns: boardSize[0],
    //           area: Number
    //     initalPos: {
    //            splitData: [],
    //            startingPos: 'String',
    //            xPos: xPos,
    //            yPos: yPos
    //        }, 
    //     moveSet: moveSet, type array of strings
    //     walls: { yPos: 4, xPos: 4, orginalData: gameData[i] }
    // }
    

function setBoard ( data ) {
    let row = data.board.rows
    let col = data.board.columns
    let board = {}

    for(var i = 0; i < col; i++) {
        for(var j = 0; j < row; j++) {
            let space = 'coin'
            if(data.walls[i.toString()+j.toString()]) {
                space = 'wall'
            }
            board[i.toString()+j.toString()] = space;
        }
    }
    board[data.initialPos.xPos.toString()+data.initialPos.yPos.toString()] = 'start';
    return board;
}

module.exports.setBoard = setBoard;