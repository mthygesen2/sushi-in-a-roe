
var expect = require('chai').expect;
var index = require('../index.js');
var GameState = index.GameState;


describe('index', function() {
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
  describe('hasCurrentPlayerWon', function() {
    it('there will be no winner yet', function() {
      var gs = new GameState();
      gs.gameBoard[2] = "X";
      gs.gameBoard[3] = "O";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(false);
    });
    it('will return true if player has won', function() {
      var gs = new GameState();
      gs.gameBoard = ["X","X","X",3,4,"O","O",7,8];
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(true);
    });
    it('will return false if other player has won', function() {
      var gs = new GameState();
      gs.gameBoard = ["X","X","X",3,4,"O","O",7,8];
      gs.currentPlayer = "O";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(false);
    });
  });
  describe('isThereATie', function() {
    it('will not be a tie when the board is not full', function() {
      var gs = new GameState();
       gs.gameBoard = [0,"X","O",3,4,5,6,7,8];
      expect(gs.isThereATie(gs.gameBoard)).to.equal(false);
    });
    it('will tie the game with board is full', function() {
      var gs = new GameState();
      gs.gameBoard = ["O","X","O","X","O","X","X","O","X"];
      expect(gs.isThereATie(gs.gameBoard)).to.equal(true);
    });
    it('will not be a tie when board is full but X has won', function() {
      var gs = new GameState();
      gs.gameBoard = ["X","X","X","X","O","X","X","O","X"];
      expect(gs.isThereATie(gs.gameBoard)).to.equal(false);
    });
    it('will not be a tie when board is full but O has won', function() {
      var gs = new GameState();
      gs.gameBoard = ["X","O","O","X","O","X","O","O","X"];
      expect(gs.isThereATie(gs.gameBoard)).to.equal(false);
    });
  });
});

describe('quit', function() {
  it('will take answer input and quit game', function() {
    expect(index.quit("quit")).to.equal(true);
  });
  it('will take answer input and continue game', function() {
    expect(index.quit("s")).to.equal(false);
  });
});
