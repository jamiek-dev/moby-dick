const MobyDick = require( './moby-dick.js' );
const md = new MobyDick();
let results = md.createCountObject( 'mobydick.txt', 'stop-words.txt' );

console.log( results );
