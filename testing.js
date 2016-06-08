/////readline ////////
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

playBoard();
playerX();

///// Player X Turn for Play After it will go to O//////////
function playerX(question){
  rl.question("What's your move Player X?", function(answer) {
    if(isTaken(gameBoard, answer)) {
    gameBoard[answer] = "X";
    playBoard();
    playerO();
    }
  });
}
function isTaken(gameBoard, answer) {
  if(gameBoard.indexOf(answer) === "X" || "O") {
    console.log("Spot is taken, please choose another position");
    playerX();
  }
}


var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var stringBoard = gameBoard.toString();
var gameOver = false;


function playBoard() {
  console.log(">TIC-TAC-TOE<");
  console.log(">> Type a number 0-8 <<");
  console.log("   " + gameBoard.slice(0,3));
  console.log("   " + gameBoard.slice(3,6));
  console.log("   " + gameBoard.slice(6,9));
}
