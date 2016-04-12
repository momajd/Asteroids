/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(6);
	
	var canvas = document.getElementById("game-canvas");
	var ctx = canvas.getContext("2d");
	
	var game = new Game();
	
	var gameView = new GameView(game, ctx);
	gameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(2);
	var Ship = __webpack_require__(5);
	
	function Game () {
	  this.DIM_X = 800;
	  this.DIM_Y = 480;
	  this.NUM_ASTEROIDS = 5;
	  this.asteroids = [];
	  this.ship = new Ship([400,240], this);
	
	  this.addAsteroids();
	}
	
	Game.prototype.randomPosition = function () {
	  var x = Math.floor(this.DIM_X * Math.random());
	  var y = Math.floor(this.DIM_Y * Math.random());
	  return [x, y];
	};
	
	Game.prototype.addAsteroids = function () {
	  for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
	    this.asteroids.push(new Asteroid(this.randomPosition(), this));
	  }
	};
	
	
	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.allObjects().forEach(function(asteroid) {
	    asteroid.draw(ctx);
	  });
	};
	
	Game.prototype.moveObjects = function () {
	  this.allObjects().forEach(function(asteroid) {
	    asteroid.move();
	  });
	};
	
	Game.prototype.wrap = function (pos) {
	  if(pos[0] > 800){
	    pos[0] = 0;
	  }
	  if(pos[1] > 480){
	    pos[1] = 0;
	  }
	
	  if(pos[0] < 0){
	    pos[0] = 800;
	  }
	  if(pos[1] < 0){
	    pos[1] = 480;
	  }
	
	  return pos;
	};
	
	Game.prototype.checkCollisions = function () {
	  for (var i = 0 ; i < this.allObjects().length - 1; i++) {
	    for (var j = i + 1 ; j < this.allObjects().length ; j++) {
	      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
	        // delete both allObjects() if they collide
	        this.allObjects()[i].collideWith(this.allObjects()[j]);
	      }
	    }
	  }
	};
	
	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};
	
	Game.prototype.remove = function (obj1, obj2) {
	  var remainingAsteroids = [];
	  for (var i = 0; i < this.asteroids.length; i++) {
	    if(this.asteroids[i] !== obj1 && this.asteroids[i] !== obj2) {
	      remainingAsteroids.push(this.asteroids[i]);
	    }
	  }
	  this.asteroids = remainingAsteroids;
	};
	
	Game.prototype.allObjects = function() {
	  return this.asteroids.concat([this.ship]);
	};
	
	module.exports = Game;
	
	// var g = new Game(100,100);
	// console.log(g.asteroids);
	// console.log(g.moveObjects());
	// console.log(g.asteroids);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);
	
	function Asteroid(pos, game) {
	  var argHash = {
	    pos: pos,
	    color: "#a9a9a9",
	    radius: 20,
	    vel: Util.randomVec(5),
	    game: game
	  };
	
	  MovingObject.call(this, argHash);
	}
	
	
	
	Util.inherits(Asteroid, MovingObject);
	
	
	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Util = {};
	
	Util.inherits = function(child, parent) {
	  var Surrogate = function(){};
	  Surrogate.prototype = parent.prototype;
	  child.prototype = new Surrogate();
	  child.prototype.constructor = child;
	};
	
	Util.randomVec = function(length) {
	  var x = Math.floor(Math.random() * length);
	  var y = Math.floor(Math.sqrt((length * length) - (x * x)));
	  return [x * randomDir(),y * randomDir()] ;
	};
	
	function randomDir() {
	  return ((Math.random() > .5) ? -1 : 1);
	}
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function MovingObject(argHash) {
	  this.pos = argHash['pos'];
	  this.vel = argHash['vel'];
	  this.radius = argHash['radius'];
	  this.color = argHash['color'];
	  this.game = argHash['game'];
	}
	
	MovingObject.prototype.draw = function(ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );
	
	  ctx.fill();
	};
	
	MovingObject.prototype.move = function(){
	  this.pos = this.game.wrap(this.pos);
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	};
	
	MovingObject.prototype.isCollidedWith = function(otherObject) {
	
	  var pos1 = this.pos;
	  var pos2 = otherObject.pos;
	
	  var dist = Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  var sumRadius = this.radius + otherObject.radius;
	
	  return (dist < sumRadius ? true: false);
	};
	
	MovingObject.prototype.collideWith = function (otherObject) {
	  if(otherObject.isShip) {
	    otherObject.relocate();
	  }
	};
	
	module.exports = MovingObject;
	
	
	
	
	
	
	
	
	
	//


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);
	
	function Ship (pos, game) {
	  var argHash = {
	    pos: pos,
	    color: "#EE0000",
	    radius: 15,
	    vel: 0,
	    game: game
	  };
	
	  MovingObject.call(this, argHash);
	}
	
	Ship.prototype.isShip = true;
	
	Ship.prototype.relocate = function() {
	  // this.pos = this.game.randomPosition();
	  this.vel = 0;
	};
	
	
	
	Util.inherits(Ship, MovingObject);
	
	
	module.exports = Ship;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function GameView (game, ctx){
	  this.game = game;
	  this.ctx = ctx;
	}
	
	GameView.prototype.start = function () {
	  setInterval(function(){
	    this.game.step();
	    this.game.draw(this.ctx);
	  }.bind(this), 20);
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map