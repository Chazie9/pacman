function hasExtraSpaces(data) {
    console.log('what is data anyway?', data)
    if (data.includes('')) {
        console.log('Please make sure inputs are in seperate files or remove spaces after the line in .txt file');
        return true;
      }
      return false;
}

module.exports.hasExtraSpaces = hasExtraSpaces;
