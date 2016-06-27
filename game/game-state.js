#!/usr/bin/env node

///constructor function of GameState////eventually put in wins
function GameState(gameDimension) {
  this.currentPlayer = "X";
  this.gameDimension = gameDimension;
  this.gameBoard = [];
  for(var i = 0; i < (gameDimension*gameDimension); i ++) {
       this.gameBoard.push(i);
    }
}

GameState.prototype.mark = function (index) {
  this.gameBoard[index] = this.currentPlayer;
}

GameState.prototype.changePlayer = function() {
  if(this.currentPlayer === "X") {
    this.currentPlayer = "O"
  } else {
    this.currentPlayer = "X"
  }
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
  for(var column = 0; column < this.gameDimension; column += 1) {
    var columnWin = true;
    for(var i = column; i < g.length; i += this.gameDimension) {
      if(g[i] != p) {
        columnWin = false;
      }
    }
    if(columnWin == true) {
      return true;
    }
  }

  for(var row = 0; row < g.length; row += this.gameDimension) {
    var rowWin = true;
    for(var i = row; i < row + this.gameDimension; i += 1) {
      if(g[i] != p) {
        rowWin = false;
      }
    }
    if(rowWin == true) {
      return true;
    }
  }
/////Diagonal starting at 0 ////

  var d1Win = true;
  for(var d1 = 0; d1 < g.length; d1 += (this.gameDimension + 1)) {
    if(g[d1] != p) {
      d1Win = false;
    }
  }
  if(d1Win == true) {
    return true;
  }

  var d2Win = true;
  var increment = this.gameDimension - 1;
  for(var d2 = increment; d2 < g.length-1; d2 += increment) {
    if(g[d2] != p) {
      d2Win = false;
    }
  }
  if(d2Win == true) {
    return true;
  }

   ////no one has won yet//////
    return false;
}

GameState.prototype.isThereATie = function () {
  var g = this.gameBoard;
  for(var tie = 0; tie < g.length; tie += 1) {
    if((g[tie] != "X") && (g[tie] != "O")) {
      return false;
    }
  }
  var playerXWon = this.hasPlayerWon("X");
  var playerOWon = this.hasPlayerWon("O");

  return playerXWon != true && playerOWon != true;
}

module.exports = GameState;
