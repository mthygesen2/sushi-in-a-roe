#!/usr/bin/env node

exports = module.exports = {};

var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var gameOver = false;


function playBoard() {
  console.log(">TIC-TAC-TOE<");
  console.log(">> Type a number 0-8 <<");
  console.log("   " + gameBoard.slice(0,3));
  console.log("   " + gameBoard.slice(3,6));
  console.log("   " + gameBoard.slice(6,9));
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
    })
};

function playerX(question){
  rl.question("What's your move Player X?", function(answer) {
    gameBoard[answer] = "X";
    playBoard();
    playerO();
  })
}


function playerO(question){
  rl.question("What's your move Play O?", function(answer) {
    gameBoard[answer] = "O";
    playBoard();
    playerX();
  })
}

module.exports.gameBoard = gameBoard;
module.exports.isGameDone = isGameDone;
