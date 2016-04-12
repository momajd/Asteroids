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
