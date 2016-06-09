#!/usr/bin/env node
/////readline ////////
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];


function playBoard() {
  console.log(">TIC-TAC-TOE<");
  console.log(">> Type a number 0-8 <<");
  console.log("   " + gameBoard.slice(0,3));
  console.log("   " + gameBoard.slice(3,6));
  console.log("   " + gameBoard.slice(6,9));
}


playBoard();
playerX();

///// Player X Turn for Play After it will go to O//////////
function playerX(question){
  rl.question("What's your move Player X?", function(answer) {
    gameBoard[answer] = "X";
    winX();
    playBoard();
  });
}
function winX(gameBoard) {
  var win1 = gameBoard.indexOf(0) === "X" && gameBoard.indexOf(1) === "X" && gameBoard.indexOf(2)=== "X";
  // var win2 = gameBoard.indexOf(0) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(8)=== "X";
  // var win3 = gameBoard.indexOf(0) === "X" && gameBoard.indexOf(3) === "X" && gameBoard.indexOf(6)=== "X";
  // var win4 = gameBoard.indexOf(1) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(7)=== "X";
  // var win5 = gameBoard.indexOf(2) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(6)=== "X";
  // var win6 = gameBoard.indexOf(3) === "X" && gameBoard.indexOf(4) === "X" && gameBoard.indexOf(5)=== "X";
  // var win7 = gameBoard.indexOf(6) === "X" && gameBoard.indexOf(7) === "X" && gameBoard.indexOf(8)=== "X";
  // var win8 = gameBoard.indexOf(2) === "X" && gameBoard.indexOf(5) === "X" && gameBoard.indexOf(8)=== "X";
  if(gameBoard === win1) {
    console.log(gameBoard);
    return console.log("winner")
  }
}
