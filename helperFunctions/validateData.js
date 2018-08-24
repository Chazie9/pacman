function hasExtraSpaces(data) {
  let index = data.length - 1;
  while (index >= 0) {
    if (data[index] === '' || data[index] === ' ') {
      data.splice(index, 1);
    }
    index -= 1;
  }

  if (data.includes('')) {
    console.log('Please make sure inputs are in seperate files or remove spaces after the line in .txt file');
    return true;
  }
  return false;
}


function validBoardPosition(board, pos) {
  if( pos.xPos > board.xMax || pos.xPos < board.xMin || pos.yPos > board.yMax || pos.yPos < board.yMin) {
    console.log('here 3A' )
    return true;
  }
}


module.exports.validBoardPosition = validBoardPosition;
module.exports.hasExtraSpaces = hasExtraSpaces;