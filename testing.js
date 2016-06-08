/////readline ////////
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// playerTurn("What's your first move?");
//
// function playerTurn(question){
//   rl.question(question, function(answer) {
//
//     gameBoard[answer] = "X";
//     console.log(gameBoard);
//   })
// }

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
