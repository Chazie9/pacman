/**
 * Write a file docstring here
 * 
 * Author: Chas Harring
 */


/**
 * Use the function below to format your input/output arguments. Be sure not to change the order of the elements in the output array. 
 * Remember that code organization is very important to us, so we encourage the use of helper functions/separate files as you see fit.
 * Input:
 *      1. inputFile (String) = contains the name of a text file you need to read that is in the same directory, includes the ".txt" extension
 *         (ie. "input.txt")
 * Output:
 *      1. array containing the final x position of Pacman, final y position of Pacman, and total number of 
 *         coins collected in that order (ie. [finalXPos, finalYPos, coinsCollected])
 */

var fs = require('fs');
const ParseGameData = require('./helperFunctions/parseGameData.js');
const FollowPath = require('./helperFunctions/followPath.js');
const MakeBoard = require('./helperFunctions/makeBoard.js');
var inputFile = './tests/input.txt';

function pacman(inputFile) {
    // Start writing your code here
    let gameInput = fs.readFileSync(inputFile).toString();
    let parsedGameData = ParseGameData.parseGameData(gameInput);

    if(!parsedGameData){
        console.log('data no good', [-1, -1, 0])
        return [-1, -1, 0]
    }
    if(parsedGameData.board.area > 1000000 )  {
        return 'Woah please upgrade features to compute a board that big';
    }

    // make a new game board
    // board includes wall and coin locations
    let board = MakeBoard.setBoard(parsedGameData);
    let game = FollowPath.movePacman(parsedGameData, board);

    //return resutls of the game
    let finalXPos = game.finalXPos
    let finalYPos = game.finalYPos
    let coinsCollected = game.coins

    //console.log('final score!', finalXPos, finalYPos, coinsCollected)
	return [finalXPos, finalYPos, coinsCollected];
}
return pacman(inputFile);

