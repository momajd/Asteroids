var Util = require("./utils.js");
var MovingObject = require("./movingObject.js");

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
