#!/usr/bin/env node
var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var playerOWins = '';
var playerXWins = '';
var catWins= '';
var myGameState = new GameState();

///constructor function of GameState////eventually put in wins
function GameState() {
  this.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  this.currentPlayer = "X";
}
//////Validates turns to make sure it is numbers 0-8////////////
GameState.prototype.validTurn = function(answer) {
  if(!this.gameBoard.hasOwnProperty(answer)) {
    return false;
  } else {
    return true;
  }
}

/////check it the spot is already taken by a player////////
GameState.prototype.isTaken = function(answer) {
  var check = this.gameBoard[answer];
  if(check === "O" || check === "X") {
    return true;
  } else {
    return false;
  }
}


GameState.prototype.hasCurrentPlayerWon =function() {
  var p = this.currentPlayer;
  return this.hasPlayerWon(p);
}

GameState.prototype.hasPlayerWon = function(p) {
  var g = this.gameBoard;
  var playerWon =
    (g[0] === p) && (g[1] === p) && (g[2]=== p)
    || (g[3] === p) && (g[4] === p) && (g[5] === p)
    || (g[6] === p) && (g[7] === p) && (g[8] === p)
    || (g[0] === p) && (g[3] === p) && (g[6] === p)
    || (g[1] === p) && (g[4] === p) && (g[7] === p)
    || (g[2] === p) && (g[5] === p) && (g[8] === p)
    || (g[0] === p) && (g[4] === p) && (g[8] === p)
    || (g[2] === p) && (g[4] === p) && (g[6] === p);

  if(playerWon === true) {
    playerXWins += 1;
    return true;
  } else {
    return false;
  }
}

GameState.prototype.isThereATie = function () {
  var g = this.gameBoard;
  var playerXWon = this.hasPlayerWon("X");
  var playerOWon = this.hasPlayerWon("O");
  var fullBoard =
    ((g[0] === "O") || (g[0] === "X")) &&
    ((g[1] === "O") || (g[1] === "X")) &&
    ((g[2] === "O") || (g[2] === "X")) &&
    ((g[3] === "O") || (g[3] === "X")) &&
    ((g[4] === "O") || (g[4] === "X")) &&
    ((g[5] === "O") || (g[5] === "X")) &&
    ((g[6] === "O") || (g[6] === "X")) &&
    ((g[7] === "O") || (g[7] === "X")) &&
    ((g[8] === "O") || (g[8] === "X"));

  if(fullBoard === true && playerXWon === false && playerOWon === false) {
    catWins += 1;
    return true;
  } else {
    return false;
  }
}

module.exports.GameState = GameState;
module.exports.myGameState = myGameState;
