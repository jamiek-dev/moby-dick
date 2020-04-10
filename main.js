module.exports = class MobyDick {
  getThatFile( file ) {
    const fs = require( 'fs' );
    const path = file;

    if( ! fs.existsSync( path ) ) {
      throw new Error();
    }

    let fileContents = fs.readFileSync( path, 'utf8' );
    return fileContents;
  }
}
