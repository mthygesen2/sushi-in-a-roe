#!/usr/bin/env node

exports = module.exports = {};

var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var playerOWins = [];
var playerXWins = [];
var catWins= [];

////Displays Game Board /////
function playBoard() {
  console.log("     --->>>TIC-TAC-TOE<<<---");
  console.log("     >> Type a number 0-8 <<");
  console.log("          " + "+-----------+");
  console.log("          | " + gameBoard.slice(0,1) + " | " + gameBoard.slice(1,2) + " | " +            gameBoard.slice(2,3) +" |");
  console.log("          | "+ "---------" +" |");
  console.log("          | " + gameBoard.slice(3,4) + " | " + gameBoard.slice(4,5)+ " | " + gameBoard.slice(5,6)+ " |");
  console.log("          | " + "---------" +" |");
  console.log("          | " + gameBoard.slice(6,7) + " | " + gameBoard.slice(7,8)+ " | " + gameBoard.slice(8,9)+ " |");
  console.log("          " + "+-----------+");
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
        console.log("*** Type 'quit' anytime to exit out of the game ***")
        playBoard();
        playerX();
      } else {
        console.log("Alright, see ya.");
        rl.close();
      }
    });
};

///// Player X Turn for Play After it will go to O//////////
function playerX(question){
  if(winX(gameBoard) === true || winO(gameBoard) === true || noWinner(gameBoard) === true) {
    rematch();
  } else {
    rl.question("What's your move Player X?", function(answer) {
      if(quit(gameBoard, answer) === true) {
        console.log("     Buh-Bye");
        console.log("    .--.    .--.");
        console.log("    |  |   /  /");
        console.log("    |  |  /  /");
        console.log("    |  | /  /");
        console.log("    |  |/  ;-._");
        console.log("    |  ` _/  / `");
        console.log("    |  /` ) /  /");
        console.log("    | /  /_/`_/:");
        console.log("    |/  /      |");
        console.log("    (  ' ; '-  |");
        console.log("    `    `.  /");
        console.log("     |      |");
        console.log("     |      | ");
        rl.close();
      } else if(validTurn(gameBoard, answer) === false) {
        playerX();
      } else if(isTaken(gameBoard, answer) === false) {
          playerX();
        } else {
          gameBoard[answer] = "X";
          playBoard();
          playerO();
        }
      });
    }
  }


////////Player O Turn after will go to Player X /////////////
function playerO(question){
  if(winX(gameBoard) === true || winO(gameBoard) === true || noWinner(gameBoard) === true) {
    rematch();
  } else {
    rl.question("What's your move Play O?", function(answer) {
        if(quit(gameBoard, answer) === true) {
        console.log("    Buh-Bye");
        console.log("    .--.    .--.");
        console.log("    |  |   /  /");
        console.log("    |  |  /  /");
        console.log("    |  | /  /");
        console.log("    |  |/  ;-._");
        console.log("    |  ` _/  / `");
        console.log("    |  /` ) /  /");
        console.log("    | /  /_/`_/:");
        console.log("    |/  /      |");
        console.log("    (  ' ; '-  |");
        console.log("    `    `.  /");
        console.log("     |      |");
        console.log("     |      | ");
        rl.close();
      } else if(validTurn(gameBoard, answer) === false) {
        playerO();
      } else if(isTaken(gameBoard, answer) === false) {
          playerO();
        } else {
          gameBoard[answer] = "O";
          playBoard();
          playerX();
        }
    });
  }
}

//////Validates turns to make sure it is numbers 0-8////////////

function validTurn(gameBoard, answer) {
  if(!gameBoard.hasOwnProperty(answer)) {
    console.log("Please put in a number 0-8");
    return false;
  } else {
    return true;
  }
}

/////check it the spot is already taken by a player////////

function isTaken(gameBoard, answer) {
  var check = gameBoard[answer];
  if(check === "O" || check === "X"){
    console.log("This spot is already taken. Please try again");
    return false;
  } else {
    return true;
  }
}

////////Quit during any time of the game /////

function quit(gameBoard, answer) {
  var quitAnswer = answer.toUpperCase();
  if(quitAnswer === "QUIT") {
    return true;
  } else {
    return false;
  }
}

//////check to see if there is a winner after each turn

function winX(gameBoard) {
  var winnerX =
    (gameBoard[0] === "X") && (gameBoard[1] === "X") && (gameBoard[2]=== "X")
    || (gameBoard[3] === "X") && (gameBoard[4] === "X") && (gameBoard[5] === "X")
    || (gameBoard[6] === "X") && (gameBoard[7] === "X") && (gameBoard[8] === "X")
    || (gameBoard[0] === "X") && (gameBoard[3] === "X") && (gameBoard[6] === "X")
    || (gameBoard[1] === "X") && (gameBoard[4] === "X") && (gameBoard[7] === "X")
    || (gameBoard[2] === "X") && (gameBoard[5] === "X") && (gameBoard[8] === "X")
    || (gameBoard[0] === "X") && (gameBoard[4] === "X") && (gameBoard[8] === "X")
    || (gameBoard[2] === "X") && (gameBoard[4] === "X") && (gameBoard[6] === "X");

  if(winnerX === true) {
    playerXWins.push(1);
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫        WINNER        ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫       Player X       ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("         The Score");
    console.log("         Player O: " + playerOWins.length);
    console.log("         Player X: " + playerXWins.length);
    console.log("         The Cat: " + catWins.length);
    return true;
  } else {
    return false;
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
    playerOWins.push(1);
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *          WINNER          * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *         Player O         * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log("        The Score");
    console.log("        Player O: " + playerOWins.length);
    console.log("        Player X: " + playerXWins.length);
    console.log("        The Cat: " + catWins.length);
     return true;
  } else {
    return false;
  }
}




function noWinner(gameBoard) {
  var tieGame =
    ((gameBoard[0] === "O") || (gameBoard[0] === "X")) &&
    ((gameBoard[1] === "O") || (gameBoard[1] === "X")) &&
    ((gameBoard[2] === "O") || (gameBoard[2] === "X")) &&
    ((gameBoard[3] === "O") || (gameBoard[3] === "X")) &&
    ((gameBoard[4] === "O") || (gameBoard[4] === "X")) &&
    ((gameBoard[5] === "O") || (gameBoard[5] === "X")) &&
    ((gameBoard[6] === "O") || (gameBoard[6] === "X")) &&
    ((gameBoard[7] === "O") || (gameBoard[7] === "X")) &&
    ((gameBoard[8] === "O") || (gameBoard[8] === "X"));

  if(tieGame === true) {
    catWins.push(1);
    console.log("=^..^=   =^..^=    =^..^=    =^..^=    =^..^= ");
    console.log("=^..^=     The cat won this one.       =^..^= ");
    console.log("=^..^=       You both lost.            =^..^= ");
    console.log("=^..^=   =^..^=    =^..^=     =^..^=   =^..^= ");
    console.log("        The Score");
    console.log("        Player O: " + playerOWins.length);
    console.log("        Player X: " + playerXWins.length);
    console.log("        The Cat: " + catWins.length);
    return true;
  } else {
    return false;
  }
}


//////Start Rematch game  ////

function rematch() {
  rl.question("Start New Game (Y/N)?", function(answer) {
    if(answer.toUpperCase() === "Y") {
      gameBoard = [0,1,2,3,4,5,6,7,8];
      playBoard();
      var gameArray = playerXWins.concat(playerOWins, catWins);
      var numberOfGames = gameArray.length;
      console.log(numberOfGames);
      if(numberOfGames%2 === 0) {
        playerX();
      } else if (numberOfGames%2 != 0) {
        playerO();
    } else {
      console.log("    Good game, see ya");
      rl.close();
    }
  }
  });
}




////EXPORTS FOR TESTING///////////

module.exports.quit = quit;
module.exports.noWinner = noWinner;
module.exports.winO = winO;
module.exports.winX = winX;
module.exports.validTurn = validTurn;
module.exports.noWinner = noWinner;
module.exports.gameBoard = gameBoard;
module.exports.isTaken = isTaken;
