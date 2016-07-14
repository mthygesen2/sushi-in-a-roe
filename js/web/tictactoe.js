'use strict';

var catWins = document.getElementById('#nekoScores');
var playerXWins = document.getElementById('#numberScoreP1');
var playerOWins = document.getElementById('#numberScoreP2');
var iconP1 = "";
var iconP2 = "";
catWins = 0;
playerXWins = 0;
playerOWins = 0;

var gamePresenter = function gamePresenter(GameState) {
  this.GameState = GameState;
};
gamePresenter.prototype.mark = function (index) {
  this.GameState.mark(index);
};

gamePresenter.prototype.getGameBoard = function () {
  return this.GameState.gameBoard;
};
gamePresenter.prototype.drawGameBoard = function () {
  var boardHtml = "";
  for (var i = 0; i < this.GameState.gameBoard.length; i++) {
    boardHtml += "<div class='box'></div>";
  }
  return boardHtml;
};

/////Will help filter out taken spots in gameboard for AI

var AI = {
  randomMark: function randomMark(gs) {
    var openSpots = gs.openSpots();
    var index = Math.floor(Math.random() * openSpots.length);
    var randomMark = openSpots[index];
    console.log(randomMark, index, openSpots);

    return randomMark;
  }
};

function replaceIcon(element, icon) {
  $(element).addClass("replaceIcon");
  $(element).html(icon);
}

gamePresenter.prototype.takeTurn = function (boxElement) {
  var gs = this.GameState;
  var spot = $(boxElement).index();
  var shouldContinue = true;
  if (gs.isTaken(spot) === true) {
    alert("Spot is taken!");
    shouldContinue = false;
    console.log('hello');
  } else {
    this.mark(spot);
    if (gs.currentPlayer === "X") {
      replaceIcon(boxElement, iconP1);
    } else if (gs.currentPlayer === "O") {
      replaceIcon(boxElement, iconP2);
    }

    if (gs.hasCurrentPlayerWon() === true) {
      shouldContinue = false;
      var playerXWon = gs.hasPlayerWon("X");
      var playerOWon = gs.hasPlayerWon("O");
      if (playerXWon === true) {
        vex.dialog.confirm({
          message: "PLAYER 1 WON!!!",
          contentClassName: 'p1Won',
          callback: function callback(value) {
            if (value === false) {
              location.reload();
            } else {
              $('#whichBoard').show();
              $('#boardList').show();
              $('#whichBoard').siblings().hide();
            }
          },
          buttons: [$.extend({}, vex.dialog.buttons.YES, {
            text: 'Play Again'
          }), $.extend({}, vex.dialog.buttons.NO, {
            text: 'Nope'
          })]
        });
        playerXWins += 1;
        $('#numberScoreP1').html(playerXWins);
      } else {
        vex.dialog.confirm({
          message: "PLAYER 2 WON!!",
          contentClassName: 'p2Won',
          callback: function callback(value) {
            if (value === false) {
              location.reload();
            } else {
              $('#whichBoard').show();
              $('#boardList').show();
              $('#whichBoard').siblings().hide();
              $('.exit span').hide();
            }
          },
          buttons: [$.extend({}, vex.dialog.buttons.YES, {
            text: 'Play Again'
          }), $.extend({}, vex.dialog.buttons.NO, {
            text: 'Nope'
          })]
        });
        playerOWins += 1;
        $('#numberScoreP2').html(playerOWins);
      }
    } else if (gs.isThereATie() === true) {
      shouldContinue = false;
      vex.dialog.confirm({
        message: "NEKO ATE YOUR SUSHI!",
        contentClassName: 'nekoWin',
        callback: function callback(value) {
          if (value === false) {
            location.reload();
          } else {
            $('#whichBoard').show();
            $('#boardList').show();
            $('#whichBoard').siblings().hide();
            $('.exit span').hide();
          }
        },
        buttons: [$.extend({}, vex.dialog.buttons.YES, {
          text: 'Play Again'
        }), $.extend({}, vex.dialog.buttons.NO, {
          text: 'Nope'
        })]
      });
      catWins += 1;
      $('#nekoScore').html(catWins);
    }
    gs.changePlayer();
  }
  return shouldContinue;
};
gamePresenter.prototype.runGame = function () {
  var self = this;
  var gs = self.GameState;
  $('.box').each(function () {
    $(this).click(function () {
      var shouldContinue = self.takeTurn(this);
      if ($('.board').hasClass('computer')) {
        if (shouldContinue) {
          var t = AI.randomMark(gs);
          var x = t + 1;
          var AIelement = $('.box:nth-of-type(' + x + ')');
          self.takeTurn(AIelement);
        }
      }
    });
  });
};

var state = new GameState(3);
var presenter = new gamePresenter(state);

////Once both players have selected an icon then Next button show
function showNext() {
  var p1 = $('#submitButtonP1').attr('value');
  var p2 = $('#submitButtonP2').attr('value');
  if (p1 === 'set' && p2 === 'set') {
    $('#startGameButton').show();
  }
}

$(document).ready(function () {
  ////Hides all boards at the start of game
  $('#boardList').hide();
  $('#whichBoard').hide();
  $('#threeBoard').hide();
  $('#fourBoard').hide();
  $('#fiveBoard').hide();
  //////Hides scores and Player Icons to select
  $('#score').hide();
  $('#iconsForP1').hide();
  $('#iconsForP2').hide();
  $('#startGameButton').hide();
  $('.exit img').hide();
  $('.exit span').hide();

  $('.exit img').click(function () {
    location.reload();
  });
  $('.exit span').click(function () {
    $('#playerList').hide();
    $('.exit img').show();
    $('#whichBoard').show();
    $('#boardList').show();
    $('#whichBoard').siblings().hide();
    $('.exit span').hide();
  });

  ////starts the Game, player can then chose the board size
  $('#startGameButton p').click(function () {
    $('#playerList').hide();
    $('.exit img').show();
    $('#whichBoard').show();
    $('#boardList').show();
    $('#whichBoard').siblings().hide();
    $('.board').addClass('playerVSplayer');
  });
  ///Player can select their icons, this is for 2 players
  $('#whichPlayer #player1 p').click(function () {
    $('#playerVsComputer').slideToggle();
  });
  $('#whichPlayer #player2 p').click(function () {
    $('#iconsForP2').slideToggle();
  });

  ////form for Player Icons sets only one selection of icon, for bother 1 player and 2 player

  $("form#playerVsComputer").submit(function (event) {
    event.preventDefault();
    iconP1 = $('#playerVsComputer input:checked').val();
    iconP2 = "<img src='/gfx/vectors/computer.svg' style='width: auto; height: 100px'>";
    $('#player1score').prepend(iconP1);
    $('#player2score').prepend(iconP2);
    $('#playerList').hide();
    $('.exit img').show();
    $('#whichBoard').show();
    $('#boardList').show();
    $('#whichBoard').siblings().hide();
    $('.board').addClass('computer');
    $(".scoreBoard #player2score p").text(function () {
      return $(this).text().replace('PLAYER 2', 'Computer');
    });
  });

  $("form#iconP1").submit(function (event) {
    event.preventDefault();
    iconP1 = $('#iconP1 input:checked').val();
    if (iconP1 === iconP2) {
      vex.dialog.alert({
        message: "The icon is taken, pick another!"
      });
    } else {
      $('#player1score').prepend(iconP1);
      $('#iconP1 :radio').attr('disabled', true);
      $('#submitButtonP1').attr('disabled', true);
      $('#submitButtonP1').attr('value', 'set');
      $('#submitButtonP1').addClass('clicked');
      showNext();
    }
  });

  $("form#iconP2.playerSelectIcons").submit(function (event) {
    event.preventDefault();
    iconP2 = $('#iconP2 input:checked').val();
    if (iconP2 === iconP1) {
      vex.dialog.alert({
        message: "The icon is taken, pick another!"
      });
    } else {
      $("#player2score").prepend(iconP2);
      $("#iconP2 :radio").attr('disabled', true);
      $('#submitButtonP2').attr('disabled', true);
      $('#submitButtonP2').attr('value', 'set');
      $('#submitButtonP2').addClass('clicked');
      showNext();
    }
  });

  /////Player choses which board to play
  $('#three').click(function () {
    var gameDimension = $(this).children('p').data('boardsize');
    presenter.GameState = new GameState(3);
    $('#threeBoard').html(presenter.drawGameBoard());
    presenter.runGame();
    $('#threeBoard').show();
    $('#whichBoard').hide();
    $('#score').show();
    $('.exit span').show();
  });
  $('#four').click(function () {
    var gameDimension = $(this).children('p').data('boardsize');
    presenter.GameState = new GameState(4);
    $('#fourBoard').html(presenter.drawGameBoard());
    presenter.runGame();
    $('#whichBoard').hide();
    $('#fourBoard').show();
    $('#score').show();
    $('.exit span').show();
  });
  $('#five').click(function () {
    var gameDimension = $(this).children('p').data('boardsize');
    presenter.GameState = new GameState(5);
    $('#fiveBoard').html(presenter.drawGameBoard());
    presenter.runGame();
    $('#whichBoard').hide();
    $('#fiveBoard').show();
    $('#score').show();
    $('.exit span').show();
  });
});
//# sourceMappingURL=../source-maps/web/tictactoe.js.map
