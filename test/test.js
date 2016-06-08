
var expect = require('chai').expect;
var index = require('../index.js');

describe('index', function() {
  describe('index.gameBoard', function() {
    it('will display gameBoard as array', function() {
      expect(index.gameBoard).to.deep.equal([0,1,2,3,4,5,6,7,8]);
    });
  });
  describe('endGame', function() {
    it('will not end the game', function() {
      expect(index.isGameDone()).to.equal(false);
    });
  });
});
