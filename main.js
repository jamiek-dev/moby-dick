const MobyDick = require( './moby-dick.js' );
const md = new MobyDick();

let fileContents = md.getThatFile( 'mobydick.txt' );
md.createStopWords( 'stop-words.txt' );
let results = md.createCountObject();

console.log( results );
