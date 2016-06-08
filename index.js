#!/usr/bin/env node

exports = module.exports = {};

var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var gameOver = false;
var playerWon = false;

////Displays Game Board /////
function playBoard() {
  console.log("--->>>TIC-TAC-TOE<<<---");
  console.log(">> Type a number 0-8 <<");
  console.log("         " + gameBoard.slice(0,3));
  console.log("         " + gameBoard.slice(3,6));
  console.log("         " + gameBoard.slice(6,9));
}

var isGameDone = function endGame() {
  if (gameOver === true) {
    console.log("You have ended the game");
  } else
  return false;
}

/////readline ////////
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/// Start game with Question and answer or Y or N///////////
startGame("Do you want to play tic-tac-toe (Y/N)?");

function startGame(question){
  rl.question(question, function(answer) {
      if(answer.toUpperCase() === "Y") {
        playBoard();
        playerX();
      } else {
        console.log("Alright, see ya.");
      }
    });
};

///// Player X Turn for Play After it will go to O//////////
function playerX(question){
  rl.question("What's your move Player X?", function(answer) {
    if(!validTurnX(gameBoard, answer)) {
    isTaken(gameBoard, answer);
    gameBoard[answer] = "X";
    playBoard();
    playerO();
    }
  });
}

////////Player O Turn after will go to Player X /////////////
function playerO(question){
  rl.question("What's your move Play O?", function(answer) {
    if(!validTurnO(gameBoard, answer)) {
      gameBoard[answer] = "O";
      playBoard();
      playerX();
      }
  });
}

//////Validates turns to make sure it is numbers 0-8////////////
function validTurnO(gameBoard, answer) {
  if(!gameBoard.hasOwnProperty(answer)) {
    console.log("Please put in a number 0-8");
      playerO();
  }
}
function validTurnX(gameBoard, answer) {
  if(!gameBoard.hasOwnProperty(answer)) {
    console.log("Please put in a number 0-8");
      playerX();
  }
}

/////If a position is taken it will make you re try  //////
function isTaken(gameBoard, answer) {
  if(gameBoard[answer] === "X" || "O") {
    console.log("Spot is taken, please choose another position");
    playerX();
  }
}


// function winX(gameBoard) {
//   var win1 = gameBoard.indexOf(0) === "X" && gameBoard.indexOf(1) === "X" && gameBoard.indexOf(2)=== "X";
//   // var win2 = gameBoard.indexOf(0) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(8)=== "X";
//   // var win3 = gameBoard.indexOf(0) === "X" && gameBoard.indexOf(3) === "X" && gameBoard.indexOf(6)=== "X";
//   // var win4 = gameBoard.indexOf(1) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(7)=== "X";
//   // var win5 = gameBoard.indexOf(2) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(6)=== "X";
//   // var win6 = gameBoard.indexOf(3) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(5)=== "X";
//   // var win7 = gameBoard.indexOf(6) === "X" && gameBoard.indexOf(7) === "X" && gameBoard.indexOf(8)=== "X";
//   // var win8 = gameBoard.indexOf(2) === "X" && gameBoard.indexOf(5) === "X" && gameBoard.indexOf(8)=== "X";
//   if(gameBoard === win1) {
//     return console.log("winner")
//   }
// }
module.exports.gameBoard = gameBoard;
module.exports.isGameDone = isGameDone;
// module.exports.winX = winX;
