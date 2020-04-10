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
    this.fileContents.replace( /(\r?\n|\r)+/g, ' ' );
  }
}
