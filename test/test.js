
var expect = require('chai').expect;
var index = require('../index.js');

var gameBoard = [0,1,2,3,4,5,6,7,8];

describe('index', function() {
  describe('gameBoard', function() {
    it('will display gameBoard as array', function() {
      expect(gameBoard).to.deep.equal([0,1,2,3,4,5,6,7,8]);
    });
  });
  describe('playBoard', function() {
    it('will display gameboard as 3 by 3', function() {
      expect(playBoard).to.equal("0,1,2", "3,4,5", "6,7,8");
    });
  });
});
