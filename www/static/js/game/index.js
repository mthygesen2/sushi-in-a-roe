#!/usr/bin/env node
'use strict';

var GameState = require('./game-state.js');
var playerOWins = 0;
var playerXWins = 0;
var catWins = 0;
var gs;
/////readline ////////
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

////Displays Game Board /////
function playBoard() {
  var g = gs.gameBoard;
  console.log("     --->>>TIC-TAC-TOE<<<---");
  console.log("     >> Type a number 0-8 <<");
  console.log("          " + "+-----------+");
  console.log("          | " + g[0] + " | " + g[1] + " | " + g[2] + " |");
  console.log("          | " + "---------" + " |");
  console.log("          | " + g[3] + " | " + g[4] + " | " + g[5] + " |");
  console.log("          | " + "---------" + " |");
  console.log("          | " + g[6] + " | " + g[7] + " | " + g[8] + " |");
  console.log("          " + "+-----------+");
}

/// Start game with Question and answer or Y or N///////////
startGame("Do you want to play tic-tac-toe (Y/N)?");

function startGame(question) {
  rl.question(question, function (answer) {
    if (answer.toUpperCase() === "Y") {
      console.log("*** Type 'quit' anytime to exit out of the game ***");
      gameSize();
    } else {
      console.log("Alright, see ya.");
      rl.close();
    }
  });
};

function gameSize() {
  rl.question("What size board?", function (answer) {
    gs = new GameState(parseInt(answer));
    var g = gs.gameBoard;
    playBoard();
    playerX();
  });
}

///// Player X Turn for Play After it will go to O//////////
function playerX() {
  if (gs.hasPlayerWon("X") === true) {
    playerXWins += 1;
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫        WINNER        ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫       Player X       ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("                  The Score");
    console.log("                  Player O: " + playerOWins);
    console.log("                  Player X: " + playerXWins);
    console.log("                  The Cat: " + catWins);
    rematch();
  } else if (gs.hasPlayerWon("O") === true) {
    playerOWins += 1;
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *          WINNER          * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *         Player O         * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log("                   The Score");
    console.log("                   Player O: " + playerOWins);
    console.log("                   Player X: " + playerXWins);
    console.log("                   The Cat: " + catWins);
    rematch();
  } else if (gs.isThereATie() === true) {
    catWins += 1;
    console.log("=^..^=   =^..^=    =^..^=    =^..^=    =^..^= ");
    console.log("=^..^=     The cat won this one.       =^..^= ");
    console.log("=^..^=       You both lost.            =^..^= ");
    console.log("=^..^=   =^..^=    =^..^=     =^..^=   =^..^= ");
    console.log("            The Score");
    console.log("            Player O: " + playerOWins);
    console.log("            Player X: " + playerXWins);
    console.log("            The Cat: " + catWins);
    rematch();
  } else {
    rl.question("What's your move Player X?", function (answer) {
      if (quit(answer) === true) {
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
      } else if (gs.validTurn(answer) === false) {
        console.log("Please put in a number 0-8");
        playerX();
      } else if (gs.isTaken(answer) === true) {
        console.log("This spot is already taken. Please try again");
        playerX();
      } else {
        gs.mark(answer);
        gs.changePlayer();
        playBoard();
        playerO();
      }
    });
  }
}

////////Player O Turn after will go to Player X /////////////
function playerO(question) {
  if (gs.hasPlayerWon("X") === true) {
    playerXWins += 1;
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫        WINNER        ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫       Player X       ▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫▪▪▫▫");
    console.log("                  The Score");
    console.log("                  Player O: " + playerOWins);
    console.log("                  Player X: " + playerXWins);
    console.log("                  The Cat: " + catWins);
    rematch();
  } else if (gs.hasPlayerWon("O") === true) {
    playerOWins += 1;
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *          WINNER          * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *         Player O         * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log(" ¸ • * ¸ • *  • ¸ * • ¸ • * ¸ • * ¸ • * • ¸ * • ¸ ");
    console.log("                   The Score");
    console.log("                   Player O: " + playerOWins);
    console.log("                   Player X: " + playerXWins);
    console.log("                   The Cat: " + catWins);
    rematch();
  } else if (gs.isThereATie() === true) {
    catWins += 1;
    console.log("=^..^=   =^..^=    =^..^=    =^..^=    =^..^= ");
    console.log("=^..^=     The cat won this one.       =^..^= ");
    console.log("=^..^=       You both lost.            =^..^= ");
    console.log("=^..^=   =^..^=    =^..^=     =^..^=   =^..^= ");
    console.log("            The Score");
    console.log("            Player O: " + playerOWins);
    console.log("            Player X: " + playerXWins);
    console.log("            The Cat: " + catWins);
    rematch();
  } else {
    rl.question("What's your move Play O?", function (answer) {
      if (quit(answer) === true) {
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
      } else if (gs.validTurn(answer) === false) {
        console.log("Please put in a number 0-8");
        playerO();
      } else if (gs.isTaken(answer) === true) {
        console.log("This spot is already taken. Please try again");
        playerO();
      } else {
        gs.mark(answer);
        gs.changePlayer();
        playBoard();
        playerX();
      }
    });
  }
}

////////Quit during any time of the game /////

function quit(answer) {
  var quitAnswer = answer.toUpperCase();
  if (quitAnswer === "QUIT") {
    return true;
  } else {
    return false;
  }
}

//////Start Rematch game  ////

function rematch() {
  rl.question("Feeling like a rematch (Y/N)?", function (answer) {
    if (answer.toUpperCase() === "N") {
      console.log("    Good game, see ya");
      rl.close();
    } else if (answer.toUpperCase() === "Y") {
      gs = new GameState(gs.gameDimension);
      playBoard();
      var totalGames = catWins + playerOWins + playerXWins;
      if (totalGames % 2 === 0) {
        gs.currentPlayer = "X";
        playerX();
      } else if (totalGames % 2 != 0) {
        gs.currentPlayer = "O";
        playerO();
      }
    } else if (answer.toUpperCase() != "Y" || answer.toUpperCase() != "N") {
      console.log("Do you want a rematch? Please input (Y/N)");
      rematch();
    }
  });
}

////EXPORTS FOR TESTING///////////

module.exports.quit = quit;
//# sourceMappingURL=../source-maps/game/index.js.map
