var catWins = document.getElementById('#nekoScores');
var playerXWins = document.getElementById('#player1Scores');
var playerOWins = document.getElementById('#player2Scores');
var icon = "";
var iconP1 = "";
var iconP2= "";
catWins = 0;
playerXWins = 0;
playerOWins = 0;

var gamePresenter = function(GameState) {
  this.GameState = GameState;
}
gamePresenter.prototype.mark = function(index) {
  this.GameState.mark(index);
}

gamePresenter.prototype.getGameBoard = function() {
  return  this.GameState.gameBoard;
}
gamePresenter.prototype.drawGameBoard = function() {
  var boardHtml = "";
  for(var i = 0; i < this.GameState.gameBoard.length; i++) {
    boardHtml += "<div class='box'></div>";
  }
  return boardHtml;
}
gamePresenter.prototype.runGame = function() {
  var self = this;
  var gs = self.GameState;
  $('.box').each(function() {
    $(this).click(function() {
      if(gs.isTaken($(this).index()) === true) {
        alert("Spot is taken!");
      } else {
        self.mark($(this).index());
        if(gs.currentPlayer === "X") {
          $(this).addClass("replaceIcon");
          $(this).html(iconP1);
        } else if (gs.currentPlayer === "O") {
          $(this).addClass("replaceIcon");
          $(this).html(iconP2)
        }
       if(gs.hasCurrentPlayerWon() === true) {
          alert("You have won");
          var playerXWon = gs.hasPlayerWon("X");
          var playerOWon = gs.hasPlayerWon("O");
          if(playerXWon === true) {
            playerXWins += 1;
            $('#player1Score').html(playerXWins);
          } else {
            playerOWins += 1;
            $('#player2Score').html(playerOWins);
          }
       } else if(gs.isThereATie() === true) {
            alert("Tie Game");
            catWins += 1;
            $('#nekoScore').html(catWins);
          }
        gs.changePlayer();
      }
    });
  });
}

var state = new GameState(3);
var presenter = new gamePresenter(state);


$(document).ready(function() {
////Hides all boards at the start of game
  // $('#boardList').hide();
  // $('#whichBoard').hide();
  $('#threeBoard').hide();
  $('#fourBoard').hide();
  $('#fiveBoard').hide();
  $('#score').hide();
  $('#iconsForP1').hide();
  $('#iconsForP2').hide();

///Player Icon toggles
  $('#whichPlayer #player1 p').click(function() {
    $('#iconsForP1').slideToggle();
  });
  $('#whichPlayer #player2 p').click(function() {
    $('#iconsForP2').slideToggle();
  });
//////Title will take you back to the board page
  $('#hero .title').click(function() {
    $('#threeBoard .box').detach();
    $('#whichBoard').show();
    $('#whichBoard').siblings().hide();
  });

  ////form for Player Icons
  $('#submitButtonP1').click( function() {
    $("form#iconP1").submit(function(event) {
      event.preventDefault();
     iconP1 = $('#iconP1 input:checked').val();
      $("#player1score").prepend(iconP1);
     console.log(iconP1);
    });
  });

  $('#submitButtonP2').click( function() {
    $("form#iconP2.playerSelectIcons").submit(function(event) {
      event.preventDefault();
     iconP2 = $('#iconP2 input:checked').val();
     $("#player2score").prepend(iconP2);
    });
  });


  // $("form#iconP2").submit(function(event) {
  //   event.preventDefault();
  //   iconP2 = $('input:checked').val();
  //   console.log(iconP2);
  // });

  /////Player choses which board to play
  $('#three').click(function() {
    var gameDimension = $(this).children('p').data('boardsize');
    presenter.GameState = new GameState(3);
    $('#threeBoard').html(presenter.drawGameBoard());
    presenter.runGame();
    $('#threeBoard').show();
    $('#whichBoard').hide();
    $('#score').show();
  });
  $('#four').click(function() {
    var gameDimension = $(this).children('p').data('boardsize');
    presenter.GameState = new GameState(4);
    $('#fourBoard').html(presenter.drawGameBoard());
    presenter.runGame();
    $('#whichBoard').hide();
    $('#fourBoard').show();
    $('#score').show();
  });
  $('#five').click(function() {
    var gameDimension = $(this).children('p').data('boardsize');
    presenter.GameState = new GameState(5);
    $('#fiveBoard').html(presenter.drawGameBoard());
    presenter.runGame();
    $('#whichBoard').hide();
    $('#fiveBoard').show();
    $('#score').show();
  });


});
