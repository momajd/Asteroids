var Util = require("./utils.js");
var MovingObject = require("./movingObject.js");

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
