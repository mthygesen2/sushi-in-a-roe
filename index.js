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
      if(isTaken(gameBoard, answer) === false) {
        playerX();
      } else {
        gameBoard[answer] = "X";
        winX(gameBoard);
        winO(gameBoard);
        playBoard();
        playerO();
      }
    }
  });
}

////////Player O Turn after will go to Player X /////////////
function playerO(question){
  rl.question("What's your move Play O?", function(answer) {
    if(!validTurnO(gameBoard, answer)) {
      if(isTaken(gameBoard, answer) === false) {
        playerO();
      } else if{
        gameBoard[answer] = "O";
        winX(gameBoard);
        winO(gameBoard);
        playBoard();
        playerX();
      }
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

/////check it the spot is already taken by a player////////


function isTaken(gameBoard, answer) {
  var check = gameBoard[answer];
  if(check === "O" || check === "X"){
    console.log("This spot is already taken. Please try again");
    return false;
  }
}

//////check to see if there is a winner after each turn

function winX(gameBoard) {
  var winnerX =
    (gameBoard[0] === "X") && (gameBoard[1] === "X") && (gameBoard[2]=== "X")                 || (gameBoard[3] === "X") && (gameBoard[4] === "X") && (gameBoard[5] === "X")
    || (gameBoard[6] === "X") && (gameBoard[7] === "X") && (gameBoard[8] === "X")
    || (gameBoard[0] === "X") && (gameBoard[3] === "X") && (gameBoard[6] === "X")
    || (gameBoard[1] === "X") && (gameBoard[4] === "X") && (gameBoard[7] === "X")
    || (gameBoard[2] === "X") && (gameBoard[5] === "X") && (gameBoard[8] === "X")
    || (gameBoard[0] === "X") && (gameBoard[4] === "X") && (gameBoard[8] === "X")
    || (gameBoard[2] === "X") && (gameBoard[4] === "X") && (gameBoard[6] === "X");

  if(winnerX === true) {
    return console.log("Winner Winner Chicken Dinner Player X");
    rl.close();
  }
}

function winO(gameBoard) {
  var winnerO =
    (gameBoard[0] === "O") && (gameBoard[1] === "O") && (gameBoard[2]=== "O")
    || (gameBoard[3] === "O") && (gameBoard[4] === "O") && (gameBoard[5] === "O")
    || (gameBoard[6] === "O") && (gameBoard[7] === "O") && (gameBoard[8] === "O")
    || (gameBoard[0] === "O") && (gameBoard[3] === "O") && (gameBoard[6] === "O")
    || (gameBoard[1] === "O") && (gameBoard[4] === "O") && (gameBoard[7] === "O")
    || (gameBoard[2] === "O") && (gameBoard[5] === "O") && (gameBoard[8] === "O")
    || (gameBoard[0] === "O") && (gameBoard[4] === "O") && (gameBoard[8] === "O")
    || (gameBoard[2] === "O") && (gameBoard[4] === "O") && (gameBoard[6] === "O");

  if(winnerO === true) {
     console.log("Winner Winner Chicken Dinner Player O");
     return true;
  }
}
module.exports.gameBoard = gameBoard;
module.exports.isGameDone = isGameDone;
module.exports.isTaken = isTaken;
// module.exports.winX = winX;
