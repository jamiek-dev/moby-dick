const MobyDick = require( '../main.js' );
const expect = require( 'chai' ).expect;
const sinon = require( 'sinon' );
const sinonChai = require( 'sinon-chai' );
const chai = require("chai");
const md = new MobyDick();
const fs = require( 'fs' );
chai.use( sinonChai );

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
    let fsStub = sinon.stub( fs, 'existsSync' ).withArgs( 'foo.txt' ).returns( true );
    let readStub = sinon.stub( fs, 'readFileSync' ).withArgs( 'foo.txt', 'utf8' ).returns( 'abcdefg' );
    let results = md.getThatFile( 'foo.txt' );

    expect( results ).to.equal( 'abcdefg' );
  } );
} );

describe( 'File Reading', function() {
  afterEach(function () {
    sinon.restore();
  });

  it( 'Replace new lines with spaces', function() {
    let fsStub = sinon.stub( fs, 'existsSync' ).withArgs( 'foo.txt' ).returns( true );
    let readStub = sinon.stub( fs, 'readFileSync' ).withArgs( 'foo.txt', 'utf8' ).returns( 'This is a sTring\nAnd this is a\n\nnew line.' );
    let data = md.getThatFile( 'foo.txt' );
    let results = md.newLinesToSpaces();

    expect( results ).to.equal( 'This is a sTring And this is a new line.' );
  } );
} );
