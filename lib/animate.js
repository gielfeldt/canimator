// Setup requestAnimationFrame().
var myRequestAnimationFrame =  window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback) {
                  window.setTimeout(callback, 1000 / 60);
               };
window.requestAnimationFrame = myRequestAnimationFrame;

// The cAnimator "class".
function cAnimator(initOptions) {
  var options = {
    width: 1280,
    height: 720,
  };

  for (var name in initOptions) {
    options[name] = initOptions[name];
  }
  console.log(initOptions);
  console.log(options);

  this.canvas = options.canvas;
  this.canvas.width = options.width;
  this.canvas.height = options.height;
  this.canvasContext = this.canvas.getContext("2d");

  this.buffer = document.createElement("canvas");
  this.buffer.width = options.width;
  this.buffer.height = options.height;
  this.bufferContext = this.buffer.getContext("2d");

  this.animations = [];
  this.animationsRunning = 0;

  console.log(this.canvas.width);
  console.log(this.canvas.height);
  console.log(this.buffer.width);
  console.log(this.buffer.height);

  cAnimator.animators.push(this);
}

// The global requestAnimationFrame ID.
cAnimator.rAFid = null;

// List of animators attached to cAnimator.
cAnimator.animators = [];

// requestAnimationFrame outer loop.
cAnimator.requestAnimationFrame = function() {
  for (var key in cAnimator.animators) {
    cAnimator.animators[key].run();
  }
  cAnimator.rAFid = requestAnimationFrame(cAnimator.requestAnimationFrame);
}

// requestAnimationFrame outer loop.
cAnimator.checkRunning = function() {
  var running = 0;
  for (var key in cAnimator.animators) {
    console.log(cAnimator.animators[key].isRunning());
    running = running || cAnimator.animators[key].isRunning();
  }
  console.log(running);
  if (running && !cAnimator.rAFid) {
    console.log("STARTING rAF");
    cAnimator.rAFid = requestAnimationFrame(cAnimator.requestAnimationFrame);
  }
  else if (!running && cAnimator.rAFid) {
    console.log("STOPPING rAF");
    cancelAnimationFrame(cAnimator.rAFid);
    cAnimator.rAFid = null;
  }
}

function FPSCalc(frames) {
  this.frames = frames;
}

FPSCalc.prototype = {
  frames: 0,
  data: [],
  add: function(fps) {
    this.data.push(fps);
    while (this.data.length > this.frames) {
      this.data.shift();
    }
  },
  get: function() {
    var sum = this.data.reduce(function(a, b) { return a + b });
    return Math.floor(sum / this.data.length);
  }
};

// Prototypes.
cAnimator.prototype = {
  lastLoop: 0,
  fps: null,
  run: function() {
    // console.log(this);
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.bufferContext.clearRect(0, 0, this.buffer.width, this.buffer.height);
    // console.log(this.animations);
    for (var key in this.animations) {
      this.animations[key].animate();
    }
    if (this.fps) {
      var thisLoop = new Date().getTime(); 
      var timeSpent = (thisLoop - this.lastLoop);
      this.lastLoop = thisLoop;
      this.fps.add(1000 / timeSpent);

      this.canvasContext.font = 16 + "px verdana";
      this.canvasContext.textBaseline = "top";
      this.canvasContext.strokeStyle = 'black';
      this.canvasContext.lineWidth = 3;
      this.canvasContext.fillStyle = '#FFFFFF';
      this.canvasContext.fillText("FPS: " + this.fps.get(), 0, 0)
    }
    // this.canvasContext.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height, 0, 0, this.canvas.width, this.canvas.height);
  },

  showFPS: function(frames) {
    if (frames === false) {
      this.fps = null;
    }
    else if (!this.fps || this.fps.frames != frames) {
      this.fps = new FPSCalc(frames);
    }
  },

  attach: function(animation) {
    this.animations[animation.id] = animation;
    this.animationsRunning++;
    cAnimator.checkRunning();
  },

  detach: function(animation) {
    delete(this.animations[animation.id]);
    this.animationsRunning--;
    cAnimator.checkRunning();
  },

  isAttached: function(animation) {
    return animation.id in this.animations;
  },

  isRunning: function() {
    return this.animationsRunning ? true : false;
  }
};

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

// Base "class" for cAnimator animations.
function cAnimationBase(options) {
  var id = cAnimationBase.globalId++;
  for (var name in options) {
    this[name] = options[name];
  }
  // console.log(this);
  this.canvas = this.cAnimator.canvas;
  this.canvasContext = this.canvas.getContext("2d");
  this.id = this.weight * 1000 + id;
};

// Global id for animations.
cAnimationBase.globalId = 0;

// Animation prototyping.
cAnimationBase.prototype = {
  weight: 0,
  canvas: null,
  id: 0,
  onStartCallbacks: [],
  onStopCallbacks: [],
  start: function() {
    // console.log("start");
    // console.log(this);
    this.init();
    this.cAnimator.attach(this);

    for (var key in this.onStartCallbacks) {
      this.onStartCallbacks[key]();
    }
  },

  isRunning: function() {
    return this.cAnimator.isAttached(this);
  },

  stop: function() {
    // console.log("stop");
    // console.log(this);
    this.cAnimator.detach(this);

    // console.log(this.onEndCallbacks);
    for (var key in this.onStopCallbacks) {
      this.onStartCallbacks[key]();
    }
  },

  resume: function() {
    // console.log("resume");
    // console.log(this);
    this.cAnimator.attach(this);
  },

  pausePlay: function() {
    if (this.isRunning()) {
      this.stop();
    }
    else {
      this.resume();
    }
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

