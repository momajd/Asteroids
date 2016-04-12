var Asteroid = require("./asteroid.js");
var Ship = require("./ship.js");

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
