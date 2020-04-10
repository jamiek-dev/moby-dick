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

  createCountObject() {
    let cleanString = this.newLinesToSpaces();
    let wordArray = cleanString.split( ' ' );
    let countObject = {};

    for( var i=0; i<wordArray.length; i++ ) {
      if( ! countObject.hasOwnProperty( wordArray[i].toLowerCase() ) ) {
        countObject[wordArray[i].toLowerCase()] = 0;
      }
    }

    return countObject;
  }
}
