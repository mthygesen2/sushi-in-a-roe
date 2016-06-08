#!/usr/bin/env node

exports = module.exports = {};

var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var stringBoard = gameBoard.toString();


function playBoard() {
  console.log(">TIC-TAC-TOE<");
  console.log(">> Type a number 0-8 <<");
  console.log("   " + stringBoard.substring(0,5));
  console.log("   " + stringBoard.substring(6,11));
  console.log("   " + stringBoard.substring(12,17));
}

var gameOver = function endGame() {
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
      } else {
        console.log("Alright, see ya.");
      }
    })
};

module.exports.gameBoard = gameBoard;
module.exports.gameOver = gameOver;
