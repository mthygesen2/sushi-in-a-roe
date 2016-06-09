
var expect = require('chai').expect;
var index = require('../index.js');


describe('index', function() {
  describe('index.gameBoard', function() {
    it('will display gameBoard as array', function() {
      expect(index.gameBoard).to.deep.equal([0,1,2,3,4,5,6,7,8]);
    });
  });
  describe('isTakenO', function() {
    it('will check if the spot is already taken on O turn', function() {
      expect(index.isTakenO(gameBoard, 'X')).to.equal(false);
    });
  });
});
