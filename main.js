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

  newLinesToSpaces() {
    return this.fileContents.replace( /(\r?\n|\r)+/g, ' ' );
  }

  createStopWords( file ) {
    let stopWordFileContents = this.getThatFile( file );
    this.stopWords = this.getAllWords( stopWordFileContents );

    return this.stopWords;
  }

  getAllWords( str ) {
    let cleanString = this.newLinesToSpaces();
    let regEx = /[a-zA-Z'-]+/g;
    let allWords = cleanString.match( regEx );

    // Let's lowercase all of the words
    // -------------------------------------------------------------
    for( var i=0; i<allWords.length; i++ ) {
      allWords[i] = allWords[i].toLowerCase();
    }

    return allWords;
  }

  createCountObject( optionalStopWords ) {
    let stopWords = optionalStopWords || null;
    let wordArray = this.getAllWords();
    let countObject = {};

    if( stopWords != null && stopWords.length ) {
      for( var i=0; i<wordArray.length; i++ ) {
        if( stopWords.indexOf( wordArray[i] ) == -1 ) {
          if( ! countObject.hasOwnProperty( wordArray[i] ) ) {
            countObject[wordArray[i]] = 0;
          }
        }
      }
    } else {
      for( var i=0; i<wordArray.length; i++ ) {
        if( ! countObject.hasOwnProperty( wordArray[i].toLowerCase() ) ) {
          countObject[wordArray[i].toLowerCase()] = 0;
        }
      }
    }

    return countObject;
  }
}
