var myRequestAnimationFrame =  window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback) {
                  window.setTimeout(callback, 1000 / 60);
               };
 window.requestAnimationFrame = myRequestAnimationFrame;

 // This is a constructor that is used to setup inheritance without
// invoking the base's constructor. It does nothing, so it doesn't
// create properties on the prototype like our previous example did
function surrogateCtor() {}

function extend(base, sub, methods) {
  // console.log(methods);
  surrogateCtor.prototype = base.prototype;
  sub.prototype = new surrogateCtor();
  sub.prototype.constructor = sub;
  // Add a reference to the parent's prototype
  sub.base = base.prototype;

  // Copy the methods passed in to the prototype
  for (var name in methods) {
    // console.log("Copying: " + name);
    if (typeof methods[name] == "function") {
      sub.prototype[name] = methods[name];
    }
    else {
      sub[name] = methods[name];
    }
  }
  // console.log(sub.margin);
  // so we can define the constructor inline
  return sub;
}

function RGB2Color(r,g,b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n)
{
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function animateBase(options) {
  // console.log(options);
  var id = animateBase.globalId++;
  for (var name in options) {
    this[name] = options[name];
  }
  // console.log(this);
  this.canvas = this.animateCanvas.buffer;
  this.canvasContext = this.canvas.getContext("2d");
  this.id = this.weight * 1000 + id;
};

animateBase.globalId = 0;
animateBase.rAFid = null;

animateBase.prototype = {
  weight: 0,
  canvas: null,
  id: 0,
  onStartCallbacks: [],
  onStopCallbacks: [],
  start: function() {
    // console.log("start");
    // console.log(this);
    this.init();
    this.animateCanvas.attach(this);

    for (var key in this.onStartCallbacks) {
      this.onStartCallbacks[key]();
    }
  },

  stop: function() {
    // console.log("stop");
    // console.log(this);
    this.animateCanvas.detach(this);

    // console.log(this.onEndCallbacks);
    for (var key in this.onStopCallbacks) {
      this.onStartCallbacks[key]();
    }
  },

  resume: function() {
    // console.log("resume");
    // console.log(this);
    this.animateCanvas.attach(this);
  },

  init: function() {},

  animate: function() {},

  onStart: function(callback) {
    this.onStartCallbacks.push(callback);
  },

  onStop: function(callback) {
    this.onStopCallbacks.push(callback);
  }
};

function repeatOften() {
  for (var key in animateCanvas.canvases) {
    // console.log(key);
    // console.log(animateCanvas.canvases[key]);
    animateCanvas.canvases[key].repeatOften();
  }
  animateBase.rAFid = requestAnimationFrame(repeatOften);
}

function animateCanvas(canvas, buffer) {
  this.canvas = canvas;
  this.canvasContext = this.canvas.getContext("2d");
  this.buffer = buffer;
  this.bufferContext = this.buffer.getContext("2d");
  this.animations = [];
  animateCanvas.canvases.push(this);
}

animateCanvas.canvases = [];
animateCanvas.initialize = function(initOptions) {
  var options = {
    width: 1280,
    height: 720,
  };

  for (var name in initOptions) {
    options[name] = initOptions[name];
  }

  canvas = options.canvas;
  canvas.width = $(canvas).width();
  canvas.height = $(canvas).height();
  /*
  window.addEventListener('resize', function(event) {
    canvas.width = $(canvas).width();
    canvas.height = $(canvas).height();
  });
  */

  var buffer = document.createElement("canvas");
  buffer.width = options.width;
  buffer.height = options.width;

  return new animateCanvas(canvas, buffer);
};


animateCanvas.prototype = {
  animations: [],

  repeatOften: function() {
    // console.log(this);
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bufferContext.clearRect(0, 0, this.buffer.width, this.buffer.height);
    // console.log(this.animations);
    for (var key in this.animations) {
      this.animations[key].animate();
    }
    this.canvasContext.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height, 0, 0, this.canvas.width, this.canvas.height);
  },

  attach: function(animate) {
    this.animations[animate.id] = animate;
  },

  detach: function(animate) {
    delete(this.animations[animate.id]);
  }
};


animateBase.rAFid = requestAnimationFrame(repeatOften);

