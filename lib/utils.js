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
