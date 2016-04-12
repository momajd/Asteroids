var Game = require("./lib/game.js");
var GameView = require("./lib/gameView.js");

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var game = new Game();

var gameView = new GameView(game, ctx);
gameView.start();
