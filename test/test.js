
var expect = require('chai').expect;
var index = require('../index.js');
var GameState = index.GameState;
var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

describe('index', function() {
  describe('index.gameBoard', function() {
    it('will display gameBoard as array', function() {
      expect(index.gameBoard).to.deep.equal([0,1,2,3,4,5,6,7,8]);
    });
  });
  describe('validTurn', function() {
    it('the input will be incorrect', function(){
      var gs = new GameState();
      expect(gs.validTurn(9)).to.equal(false);
    });
    it('will be a correct input', function() {
      var gs = new GameState();
      expect(gs.validTurn(2)).to.equal(true);
    });
  });
  describe('isTaken', function() {
    it('input will be free to be taken by  player', function() {
      var gs = new GameState();
      expect(gs.isTaken(1)).to.equal(false);
    });

    it('input will taken already', function() {
      var gs = new GameState();
      gs.gameBoard[2] = "X";
      expect(gs.isTaken(2)).to.equal(true);
    });
  });
  describe('winX', function() {
    it('there will be no winner yet', function() {
      var gameBoard = [0,"X","O",3,4,5,6,7,8];
      expect(index.winX(gameBoard)).to.equal(false);
    });
    it('there will be no winner yet', function() {
      var gameBoard = ["X","X","X",3,4,"O","O",7,8];
      expect(index.winX(gameBoard)).to.equal(true);
    });
  });
  describe('winO', function() {
    it('there will be no winner yet', function() {
      var gameBoard = [0,"X","O",3,4,5,6,7,8];
      expect(index.winO(gameBoard)).to.equal(false);
    });
    it('there will be no winner yet', function() {
      var gameBoard = ["X","O","X",3,"O",5,"X","O",8];
      expect(index.winO(gameBoard)).to.equal(true);
    });
  });
  describe('noWinner', function() {
    it('the game is not over yet', function() {
      var gameBoard = [0,"X","O",3,4,5,6,7,8];
      expect(index.noWinner(gameBoard)).to.equal(false);
    });
    it('the game is over and it is a tie game', function() {
      var gameBoard = ["O","X","O","X","O","X","X","O","X"];
      expect(index.noWinner(gameBoard)).to.equal(true);
    });
  });
  describe('quit', function() {
    it('will take answer input and quit game', function() {
    expect(index.quit(gameBoard, "quit")).to.equal(true);
    });
    it('will take answer input and continue game', function() {
    expect(index.quit(gameBoard, "s")).to.equal(false);
    });
  });
});
