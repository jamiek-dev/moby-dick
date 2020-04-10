const MobyDick = require( '../main.js' );
const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );
const sinonChai = require( 'sinon-chai' );
const chai = require("chai");
const md = new MobyDick();
const fs = require( 'fs' );
chai.use( sinonChai );

/**
 * Set up some repeating stubs and get file text
 * @param   string | readFileResults | Stub results to return from readFileSync
 * @return  string | data | File contents string
 */
function checkAndReadFileStub( readFileResults ) {
  let fsStub = sinon.stub( fs, 'existsSync' ).withArgs( 'foo.txt' ).returns( true );
  let readStub = sinon.stub( fs, 'readFileSync' ).withArgs( 'foo.txt', 'utf8' ).returns( readFileResults );
  let data = md.getThatFile( 'foo.txt' );

  return data;
}

// Successfully read from a file
// -------------------------------------------------------------------------------
describe( 'File validation', function() {
  afterEach(function () {
    sinon.restore();
  });

  it( 'Check if file exists', function() {
    let fsStub = sinon.stub(fs, 'existsSync').returns( true );
    let readStub = sinon.stub( fs, 'readFileSync' ).returns( 'abc' );
    let results = md.getThatFile( 'foo.txt' );

    expect( fsStub ).to.have.been.calledWith( 'foo.txt' );
  } );

  it( 'Throws error if file doesn\'t exist', function() {
    let fsStub = sinon.stub(fs, 'existsSync').withArgs( 'foo.txt' ).returns( false );

    expect( () => md.getThatFile('foo.txt') ).to.throw();
  } );

  it( 'Returns the contents of a file', function() {
    let results = checkAndReadFileStub( 'abcdefg' );

    expect( results ).to.equal( 'abcdefg' );
  } );
} );

describe( 'File Reading', function() {
  afterEach(function () {
    sinon.restore();
  });

  it( 'Replace new lines with spaces', function() {
    let data = checkAndReadFileStub( 'This is a sTring\nAnd this is a\n\nnew line' );
    let results = md.newLinesToSpaces();

    expect( results ).to.equal( 'This is a sTring And this is a new line' );
  } );

  it( 'Create stopword array', function() {
    let fsStub = sinon.stub( fs, 'existsSync' ).withArgs( 'foo.txt' ).returns( true );
    let readStub = sinon.stub( fs, 'readFileSync' ).withArgs( 'foo.txt', 'utf8' ).returns( 'about a above across after again' );
    let stopWords = md.createStopWords( 'foo.txt' );

    expect( stopWords ).to.eql( ['about', 'a', 'above', 'across', 'after', 'again'] );
  } );

  it( 'Create word array from string', function() {
    let data = checkAndReadFileStub( 'This: is some "day-To-day" text; Cool?' );
    let allWords = md.getAllWords();

    expect( allWords ).to.eql( ['this', 'is', 'some', 'day-to-day', 'text', 'cool'] );
  } );

  it( 'Create word count object', function() {
    let data = checkAndReadFileStub( 'This is a sTring\nAnd this is a\n\nnew line' );
    let countObject = md.createCountObject();

    expect( countObject ).to.eql( { this: 0, is: 0, a: 0, string: 0, and: 0, new: 0, line: 0 } );
  } );

  it( 'Create word count object excluding stopwords', function() {
    let data = checkAndReadFileStub( 'This is a sTring\nAnd this is a\n\nnew line' );
    let countObject = md.createCountObject( ['string', 'and', 'new'] );

    expect( countObject ).to.eql( { this: 0, is: 0, a: 0, line: 0 } );
  } );
} );
