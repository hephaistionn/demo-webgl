Engine = function() {};

Engine.prototype.initCanvas = function() {

  var canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  document.body.appendChild(canvas);

  gl = canvas.getContext("webgl");

  this.gl = gl;
};