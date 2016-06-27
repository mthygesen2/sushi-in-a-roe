var expect = require('chai').expect;
var GameState = require('../game-state.js');


describe('game', function() {
  describe('validTurn', function() {
    it('the input will be incorrect', function(){
      var gs = new GameState();
      expect(gs.validTurn(9)).to.equal(false);
    });
    it('will be a correct input', function() {
      var gs = new GameState();
      gs.gameBoard = [0,1,2,3,4,5,6,7,8];
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
      var gs = new GameState(3);
      gs.gameBoard = [0,1,"X","O",4,5,6,7,8];
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(false);
    });
    it('will return true if player has won', function() {
      var gs = new GameState();
      gs.gameBoard = ["X","X","X",3,4,"O","O",7,8];
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(true);
    });
    it('will return false if other player has won', function() {
      var gs = new GameState(3);
      gs.gameBoard = ["X","X","X",3,4,"O","O",7,8];
      gs.currentPlayer = "O";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(false);
    });
    it('will return true for a 0,3,6 win', function() {
      var gs = new GameState();
      gs.gameBoard = ["X",1,"X","X",4,"O","X",7,8];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(true);
    });
    it('will return true for a 1,4,7 win', function() {
      var gs = new GameState();
      gs.gameBoard = [0,"X",2,3,"X","O",6,"X",8];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(true);
    });
    it('will return true for a 0,1,2 win', function() {
      var gs = new GameState();
      gs.gameBoard = ["X","X","X",3,4,"O",6,"X",8];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(true);
    });
    it('will return true for a 0,4,8 win', function() {
      var gs = new GameState();
      gs.gameBoard = ["X",1,2,3,"X",5,6,7,"X"];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(true);
    });
    it('will return true for a 2,4,6 win', function() {
      var gs = new GameState();
      gs.gameBoard = [0,1,"X",3,"X",5,"X",7,8];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon(gs.gameBoard)).to.equal(true);
    });
    it('will return true for a 2x2 win 0,1', function() {
      var gs = new GameState(2);
      gs.gameBoard = ["X","X",2,3];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon()).to.equal(true);
    });
    it('will return true for a 2x2 win 0,2', function() {
      var gs = new GameState(2);
      gs.gameBoard = ["X",1,"X",3];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon()).to.equal(true);
    });
    it('will return true for a 2x2 win 1,3', function() {
      var gs = new GameState(2);
      gs.gameBoard = [0,"X",2,"X"];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon()).to.equal(true);
    });
    it('will return false for a 2x2 at only one spot ', function() {
      var gs = new GameState(2);
      gs.gameBoard = [0,"X",2,3];
      gs.currentPlayer = "X";
      expect(gs.hasCurrentPlayerWon()).to.equal(false);
    });
  });
  describe('isThereATie', function() {
    it('will not be a tie when the board is not full', function() {
      var gs = new GameState();
       gs.gameBoard = [0,"X","O",3,4,5,6,7,8];
      expect(gs.isThereATie(gs.gameBoard)).to.equal(false);
    });
    it('will tie the game with board is full', function() {
      var gs = new GameState(3);
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
  describe('changePlayer', function() {
    it('will change the player from X to O', function() {
      var gs = new GameState();
      gs.currentPlayer = "X";
      gs.changePlayer();
      expect(gs.currentPlayer).to.equal("O");
    });
    it('will change the player from O to X', function() {
      var gs = new GameState();
      gs.currentPlayer = "O";
      gs.changePlayer();
      expect(gs.currentPlayer).to.equal("X");
    });
  });
  describe('mark', function() {
    it('will mark the current player', function() {
      var gs = new GameState();

      gs.mark(0);
      expect(gs.gameBoard[0]).to.equal("X");

      gs.changePlayer();
      gs.mark(1);
      expect(gs.gameBoard[1]).to.equal("O");
    });
  });
  describe('GameState', function () {
    it('will build a board in GameState', function() {
      var gs = new GameState(3);
      expect(gs.gameBoard).to.deep.equal([0,1,2,3,4,5,6,7,8]);

      var gs = new GameState(2);
      expect(gs.gameBoard).to.deep.equal([0,1,2,3]);
    });
  });
});
