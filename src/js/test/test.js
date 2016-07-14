var expect = require('chai').expect;
var index = require('../cli/index.js');
var GameState = index.GameState;


describe('quit', function() {
  it('will take answer input and quit game', function() {
    expect(index.quit("quit")).to.equal(true);
  });
  it('will take answer input and continue game', function() {
    expect(index.quit("s")).to.equal(false);
  });
});
