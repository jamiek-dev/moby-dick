module.exports = class MobyDick {
  constructor() {
    this.fileContents = '';
    this.stopWords = [];
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

  newLinesToSpaces( str ) {
    return str.replace( /(\r?\n|\r)+/g, ' ' );
  }

  createStopWords( file ) {
    let stopWordFileContents = this.getThatFile( file );
    let wordArray = this.getAllWords( stopWordFileContents );

    this.stopWords = [...new Set( wordArray )];
  }

  getAllWords( str ) {
    let cleanString = this.newLinesToSpaces( str );
    let regEx = /[a-zA-Z'-]+/g;
    let allWords = cleanString.match( regEx );

    // Let's lowercase all of the words
    // -------------------------------------------------------------
    for( var i=0; i<allWords.length; i++ ) {
      allWords[i] = allWords[i].toLowerCase();
    }

    return allWords;
  }

  createCountObject() {
    let stopWords = this.stopWords;
    let wordArray = this.getAllWords( this.fileContents );
    let countObject = {};

    if( stopWords.length ) {
      for( var i=0; i<wordArray.length; i++ ) {
        if( stopWords.indexOf( wordArray[i] ) == -1 ) {
          countObject.hasOwnProperty( wordArray[i] )
            ? countObject[wordArray[i]]++
            : countObject[wordArray[i]] = 1;
        }
      }
    } else {
      for( var i=0; i<wordArray.length; i++ ) {
        countObject.hasOwnProperty( wordArray[i] )
          ? countObject[wordArray[i]]++
          : countObject[wordArray[i]] = 1;
      }
    }

    return countObject;
  }
}
