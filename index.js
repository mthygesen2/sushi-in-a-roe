#!/usr/bin/env node

/////readline ////////
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var playerOWins = [];
var playerXWins = [];
var catWins= [];
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
    playerXWins.push(1);
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
    catWins.push(1);
    return true;
  } else {
    return false;
  }
}
////Displays Game Board /////
function playBoard() {
  var g = myGameState.gameBoard;
  console.log("     --->>>TIC-TAC-TOE<<<---");
  console.log("     >> Type a number 0-8 <<");
  console.log("          " + "+-----------+");
  console.log("          | " + g[0] + " | " + g[1] + " | " +            g[2] +" |");
  console.log("          | "+ "---------" +" |");
  console.log("          | " + g[3] + " | " + g[4]+ " | " + g[5]+ " |");
  console.log("          | " + "---------" +" |");
  console.log("          | " + g[6] + " | " + g[7]+ " | " + g[8]+ " |");
  console.log("          " + "+-----------+");
}


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
function playerX(){
  if(myGameState.hasPlayerWon("X") === true ) {
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫        WINNER        ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫       Player X       ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("                  The Score");
    console.log("                  Player O: " + playerOWins.length);
    console.log("                  Player X: " + playerXWins.length);
    console.log("                  The Cat: " + catWins.length);
    rematch();
  } else if (myGameState.hasPlayerWon("O") === true) {
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *          WINNER          * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *         Player O         * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log("                   The Score");
    console.log("                   Player O: " + playerOWins.length);
    console.log("                   Player X: " + playerXWins.length);
    console.log("                   The Cat: " + catWins.length);
    rematch();
  } else if (myGameState.isThereATie() === true) {
    console.log("=^..^=   =^..^=    =^..^=    =^..^=    =^..^= ");
    console.log("=^..^=     The cat won this one.       =^..^= ");
    console.log("=^..^=       You both lost.            =^..^= ");
    console.log("=^..^=   =^..^=    =^..^=     =^..^=   =^..^= ");
    console.log("            The Score");
    console.log("            Player O: " + playerOWins.length);
    console.log("            Player X: " + playerXWins.length);
    console.log("            The Cat: " + catWins.length);
      rematch();
  } else {
    rl.question("What's your move Player X?", function(answer) {
      if(quit(answer) === true) {
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
      } else if(myGameState.validTurn(answer) === false) {
        console.log("Please put in a number 0-8");
        playerX();
      } else if(myGameState.isTaken(answer) === true) {
          console.log("This spot is already taken. Please try again");
          playerX();
        } else {
          myGameState.gameBoard[answer] = "X";
          playBoard();
          playerO();
        }
      });
    }
  }


////////Player O Turn after will go to Player X /////////////
function playerO(question){
  if(myGameState.hasPlayerWon("X") === true) {
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫        WINNER        ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫       Player X       ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("                  The Score");
    console.log("                  Player O: " + playerOWins.length);
    console.log("                  Player X: " + playerXWins.length);
    console.log("                  The Cat: " + catWins.length);
    rematch();
  } else if (myGameState.hasPlayerWon("O") === true) {
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *          WINNER          * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *         Player O         * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log("                   The Score");
    console.log("                   Player O: " + playerOWins.length);
    console.log("                   Player X: " + playerXWins.length);
    console.log("                   The Cat: " + catWins.length);
    rematch();
  } else if(myGameState.isThereATie() === true) {
    console.log("=^..^=   =^..^=    =^..^=    =^..^=    =^..^= ");
    console.log("=^..^=     The cat won this one.       =^..^= ");
    console.log("=^..^=       You both lost.            =^..^= ");
    console.log("=^..^=   =^..^=    =^..^=     =^..^=   =^..^= ");
    console.log("            The Score");
    console.log("            Player O: " + playerOWins.length);
    console.log("            Player X: " + playerXWins.length);
    console.log("            The Cat: " + catWins.length);
    rematch();
  } else {
    rl.question("What's your move Play O?", function(answer) {
        if(quit(answer) === true) {
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
      } else if(myGameState.validTurn(answer) === false) {
        console.log("Please put in a number 0-8");
        playerO();
      } else if(myGameState.isTaken(answer) === true) {
          console.log("This spot is already taken. Please try again");
          playerO();
        } else {
          myGameState.gameBoard[answer] = "O";
          playBoard();
          playerX();
        }
    });
  }
}



////////Quit during any time of the game /////

function quit(answer) {
  var quitAnswer = answer.toUpperCase();
  if(quitAnswer === "QUIT") {
    return true;
  } else {
    return false;
  }
}

//////Start Rematch game  ////

function rematch() {
  rl.question("Feeling like a rematch (Y/N)?", function(answer) {
    if(answer.toUpperCase() === "N") {
      console.log("    Good game, see ya");
      rl.close();
    } else if(answer.toUpperCase() === "Y") {
      myGameState.gameBoard = [0,1,2,3,4,5,6,7,8];
      playBoard();
      var gameArray = playerXWins.concat(playerOWins, catWins);
      var numberOfGames = gameArray.length;
      if(numberOfGames%2 === 0) {
        playerX();
      } else if (numberOfGames%2 != 0) {
        playerO();
      }
    } else if(answer.toUpperCase() != "Y" || answer.toUpperCase() != "N") {
      console.log("Do you want a rematch? Please input (Y/N)");
      rematch();
    }
  });
}




////EXPORTS FOR TESTING///////////
module.exports.GameState = GameState;
module.exports.quit = quit;
module.exports.gameBoard = gameBoard;
