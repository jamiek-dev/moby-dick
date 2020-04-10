module.exports = class MobyDick {
  constructor() {
    this.fileContents = '';
  }

  getThatFile( file ) {
    const fs = require( 'fs' );
    const path = file;

    if( ! fs.existsSync( path ) ) {
      throw new Error();
    }

    this.fileContents = fs.readFileSync( path, 'utf8' );

    return this.fileContents;
  }

  newLinesToSpaces() {
    return this.fileContents.replace( /(\r?\n|\r)+/g, ' ' );
  }

  // createStopWords() {
  //
  // }

  // Need a function to explode file contents into only words
  getAllWords( str ) {
    let cleanString = this.newLinesToSpaces();
    let regEx = /[a-zA-Z'-]+/g;

    return cleanString.match( regEx );
  }

  createCountObject() {
    let wordArray = this.getAllWords();
    let countObject = {};

    for( var i=0; i<wordArray.length; i++ ) {
      if( ! countObject.hasOwnProperty( wordArray[i].toLowerCase() ) ) {
        countObject[wordArray[i].toLowerCase()] = 0;
      }
    }

    return countObject;
  }
}
