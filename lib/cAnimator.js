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


cAnimator = (function() {
  var $this = function (options) {
    this.defaultOptions(options, {
      pre: function () { this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height) },
      post: function () {},
      canvas: null,
      width: 1280,
      height: 720,
    });

    this.canvas = this.canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvasCtx = this.canvas.getContext("2d");

    cAnimator.animators.push(this);
  }

  EasyOOP.extend(null, $this, {
    name: 'cAnimator',
    animations: [],
    lastLoop: 0,
    fps: null,
    run: function() {
      this.pre.call(this);

      var stats = [];
      var totalTime = 0;

      for (var weight in this.animations) {
        for (var id in this.animations[weight]) {
          var stat = {};
          stat.start = new Date().getTime();
          stat.name = this.animations[weight][id].name;
          // console.log(this.animations[weight][id].name);
          // asdasdsad();
          this.animations[weight][id].run();
          stat.end = new Date().getTime();
          stats.push(stat);
          totalTime += stat.end - stat.start;
        }
      }

      // console.log(stats);

      this.post();

      if (this.fps) {
        var thisLoop = new Date().getTime(); 
        var timeSpent = (thisLoop - this.lastLoop);
        this.lastLoop = thisLoop;
        this.fps.add(1000 / timeSpent);

        this.canvasCtx.font = 16 + "px verdana";
        this.canvasCtx.textBaseline = "top";
        this.canvasCtx.strokeStyle = 'black';
        this.canvasCtx.lineWidth = 3;
        this.canvasCtx.fillStyle = '#FFFFFF';

        this.canvasCtx.fillText("FPS: " + this.fps.get(), 0, 0);

        var y = 0;
        for (var i = 0; i < stats.length; i++) {
          var stat = stats[i];
          y += 24;
          this.canvasCtx.fillText(stat.name + ": " + (stat.end - stat.start) + " ms", 0, y);
        }
        y += 24;
        this.canvasCtx.fillText("Total: " + (totalTime) + " ms", 0, y);
      }
    },

    showStats: function(frames) {
      if (typeof frames === "undefined") {
        return this.fps ? true : false;
      }

      if (frames === false) {
        this.fps = null;
      }
      else if (!this.fps || this.fps.frames != frames) {
        this.fps = new FPSCalc(frames);
      }
    },

    attach: function(animation) {
      if (typeof this.animations[animation.weight] === "undefined") {
        this.animations[animation.weight] = [];
      }
      this.animations[animation.weight][animation.id] = animation;
    },

    detach: function(animation) {
      delete(this.animations[animation.weight][animation.id]);
      if (this.animations[animation.weight].length == 0) {
        delete(this.animations[animation.weight]);
      }
    },

    isAttached: function(animation) {
      for (var weight in this.animations) {
        if (animation.id in this.animations[weight]) {
          return true;
        }
      }
      return false;
    },

    isRunning: function() {
      return cAnimator.rAFid ? true : false;
    },

    start: function() {
      if (!cAnimator.rAFid) {
        cAnimator.rAFid = requestAnimationFrame(cAnimator.requestAnimationFrame);        
      }
    },

    stop: function() {
      if (cAnimator.rAFid) {
        cancelAnimationFrame(cAnimator.rAFid);
        cAnimator.rAFid = null;
      }
    }

  });

  return $this
})();

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






cAnimationBase = (function(options) {
  var $this = function(options) {
    this.id = cAnimationBase.globalId++;
    this.defaultOptions(options, {
      animator: null,
      width: null,
      height: null,
      buffered: false,
      weight: 0,
      onStartCallbacks: [],
      onStopCallbacks: [],
    });

    this.canvas = this.animator.canvas;
    this.canvasCtx = this.canvas.getContext("2d");
    this.originalBuffered = this.buffered;
    this.setBuffering(this.buffered);
  }

  EasyOOP.extend(null, $this, {
    name: 'cAnimationBase',
    state: "stopped",
    bufferCanvas: null,

    setBuffering: function(enable) {
      if (this.buffered = enable) {
        if (!this.bufferCanvas) {
          console.log("Creating buffer canvas");
          this.bufferCanvas = document.createElement('canvas');
          this.bufferCanvas.width = this.width ? this.width : this.canvas.width;
          this.bufferCanvas.height = this.height ? this.height : this.canvas.height;
        }
        this.buffer = this.bufferCanvas;
        this.bufferCtx = this.buffer.getContext("2d");
      }
      else {
        console.log("Using canvas directly");
        this.buffer = this.canvas;
        this.bufferCtx = this.canvasCtx;
      }
    },

    run: function() {
      if (!this.buffered || this.state !== "paused") {
        this.preAnimate();
        this.animate();
      }
      this.postAnimate();
      if (this.state === "pausing") {
        this.state = "paused";
      }
    },

    preAnimate: function() {
      if (this.buffered) {
        this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
      }
    },

    postAnimate: function() {
      if (this.buffered) {
        this.canvasCtx.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height, 0, 0, this.canvas.width, this.canvas.height);
      }
    },

    onStart: function(callback) {
      this.onStartCallbacks.push(callback);
    },

    onStop: function(callback) {
      this.onStopCallbacks.push(callback);
    },

    start: function() {
      this.init();
      this.state = "running";
      this.animator.attach(this);

      for (var key in this.onStartCallbacks) {
        this.onStartCallbacks[key]();
      }
    },

    stop: function() {
      console.log("STOPPED");
      this.animator.detach(this);
      this.state = "stopped";
      this.shutdown();

      for (var key in this.onStopCallbacks) {
        this.onStopCallbacks[key]();
      }
    },

    pause: function() {
      if (this.state === "paused" || this.state === "pausing") {
        return;
      }

      if (!this.buffered) {
        this.setBuffering(true);
        this.state = "pausing";
      }
      else {
        this.state = "paused";
      }
    },

    resume: function() {
      if (this.state !== "paused") {
        return;
      }
      this.state = "running";
      this.setBuffering(this.originalBuffered);
    },

    init: function() {},
    shutdown: function() {},
    animate: function() {}

  })

  return $this;
})();

// Global id for animations.
cAnimationBase.globalId = 0;


