// Cross-browser image smoothing extensions
 
// Get image smoothing
CanvasRenderingContext2D.prototype.getImageSmoothing = function () {
  if (this.imageSmoothingEnabled !== undefined) return this.imageSmoothingEnabled;
  if (this.mozImageSmoothingEnabled !== undefined) return this.mozImageSmoothingEnabled;
  if (this.oImageSmoothingEnabled !== undefined) return this.oImageSmoothingEnabled;
  if (this.webkitImageSmoothingEnabled !== undefined) return this.webkitImageSmoothingEnabled;
}

// Set image smooting
CanvasRenderingContext2D.prototype.setImageSmoothing = function (enabled) {
  if (this.imageSmoothingEnabled !== undefined) return this.imageSmoothingEnabled = enabled ? true : false;
  if (this.mozImageSmoothingEnabled !== undefined) return this.mozImageSmoothingEnabled = enabled ? true : false;
  if (this.oImageSmoothingEnabled !== undefined) return this.oImageSmoothingEnabled = enabled ? true : false;
  if (this.webkitImageSmoothingEnabled !== undefined) return this.webkitImageSmoothingEnabled = enabled ? true : false;
}

// save old getContext
var oldgetContext = HTMLCanvasElement.prototype.getContext;

// get a context, set it to smoothed if it was a 2d context, and return it.
function getSmoothContext(contextType) {
  var resCtx = oldgetContext.apply(this, arguments);
  if (contextType == '2d') {
    resCtx.setImageSmoothing(true);
  }
  return resCtx;
}

// inject new smoothed getContext
HTMLCanvasElement.prototype.getContext = getSmoothContext ;


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
    this.id = cAnimator.globalId++;

    this.defaultProperties({
      animations: [],
      lastLoop: 0,
      fps: null,
      paused: false,
    })

    this.defaultOptions(options, {
      pre: function () { this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height) },
      post: function () {},
      canvas: null,
      width: 1280,
      height: 720,
      stats: null,
      viewport: null,
      maintainAspectRatio: true,
      weight: 100,
    });

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.canvasCtx = this.canvas.getContext("2d");
    console.log(this.canvasCtx)

    this.stats = this.stats ? this.stats : this.canvas;
    this.statsCtx = this.stats.getContext("2d");

    this.onResize(innerWidth, innerHeight)
  }

  EasyOOP.extend(null, $this, {
    name: 'cAnimator',

    run: function(timestamp) {
      // console.log("Running: " + this.id)
      // console.log(this)
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
          this.animations[weight][id].run(timestamp);
          stat.end = new Date().getTime();
          stats.push(stat);
          totalTime += stat.end - stat.start;
        }
      }

      // console.log(stats);

      this.post();

      if (this.fps) {
        if (this.stats.id != this.canvas.id) {
          this.statsCtx.clearRect(0, 0, this.stats.width, this.stats.height)
        }
        var thisLoop = new Date().getTime(); 
        var timeSpent = (thisLoop - this.lastLoop);
        this.lastLoop = thisLoop;
        this.fps.add(1000 / timeSpent);

        this.statsCtx.font = 16 + "px verdana";
        this.statsCtx.textBaseline = "top";
        this.statsCtx.strokeStyle = 'black';
        this.statsCtx.lineWidth = 3;
        this.statsCtx.fillStyle = '#FFFFFF';

        this.statsCtx.fillText("FPS: " + this.fps.get(), 0, 0);

        var y = 0;
        for (var i = 0; i < stats.length; i++) {
          var stat = stats[i];
          y += 24;
          this.statsCtx.fillText(stat.name + ": " + (stat.end - stat.start) + " ms", 0, y);
        }
        y += 24;
        this.statsCtx.fillText("Total: " + (totalTime) + " ms", 0, y);
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
      console.log("Attaching: " + animation.id + " to " + this.id)
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
      return cAnimator.animators[this.id] ? true : false;
    },

    start: function() {
      cAnimator.animators[this.id] = this;
    },

    stop: function() {
      delete(cAnimator.animators[this.id]);
    },

    pause: function() {
      for (var weight in this.animations) {
        for (var id in this.animations[weight]) {
          this.animations[weight][id].pause()
        }
      }
      this.paused = true;
    },

    resume: function() {
      for (var weight in this.animations) {
        for (var id in this.animations[weight]) {
          this.animations[weight][id].start()
        }
      }
      this.paused = false;
    },

    resize: function(width, height) {
      this.canvas.width = this.width = width;
      this.canvas.height = this.height = height;
      for (var weight in this.animations) {
        for (var id in this.animations[weight]) {
          this.animations[weight][id].resize(width, height)
        }
      }
    },

    onResize: function (width, height) {

      if (this.viewport) {
        width = this.viewport.offsetWidth
        height = this.viewport.offsetHeight
      }

      console.log("Input: " + width + "x" + height);

      var ratio = this.width / this.height
      var newwidth = width
      var newheight = height

      if (this.maintainAspectRatio) {
        var newratio = newwidth / newheight;
        console.log(newratio);
        if (newratio < ratio) {
          newheight = newwidth / ratio
        }
        else {
          newwidth = newheight * ratio
        }
      }

      console.log("New: " + newwidth + "x" + newheight);

      var gapw = width - newwidth
      var gaph = height - newheight

      this.canvas.style.width = newwidth + "px"
      this.canvas.style.height = newheight + "px"
      this.canvas.style.left = Math.round(gapw / 2) + "px"
      this.canvas.style.top = Math.round(gaph / 2) + "px"
    },

    moveTo: function(x, y) {
      this.canvas.style.margin = (-y) + "px 0 0 " + (-x) + "px"
    }

  });

  return $this
})();

// The global requestAnimationFrame ID.
cAnimator.rAFid = null;

// Global id for animators.
cAnimator.globalId = 0;

// List of animators attached to cAnimator.
cAnimator.animators = [];

// requestAnimationFrame outer loop.
cAnimator.requestAnimationFrame = function(timestamp) {
  cAnimator.timestamp = timestamp;
  // console.log(timestamp);
  for (var key in cAnimator.animators) {
    cAnimator.animators[key].run(timestamp);
  }
  cAnimator.rAFid = requestAnimationFrame(cAnimator.requestAnimationFrame);
}

cAnimator.start = function() {
  if (!cAnimator.rAFid) {
    cAnimator.timestamp = null;
    cAnimator.rAFid = requestAnimationFrame(cAnimator.requestAnimationFrame);
  }
}

cAnimator.stop = function() {
  if (cAnimator.rAFid) {
    cancelAnimationFrame(cAnimator.rAFid);
    cAnimator.rAFid = null;
    cAnimator.timestamp = null;
  }
}


window.onorientationchange = window.onresize = function(w, h) {
  var mw = Infinity;
  var mh = Infinity;
  if (arguments.length === 2) {
    mw = w;
    mh = h;
  }
  var width = Math.min(mw, innerWidth);
  var height = Math.min(mh, innerHeight);

  for (var id in cAnimator.animators) {
    cAnimator.animators[id].onResize(width, height)
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






cAnimationBase = (function(options) {
  var $this = function(options) {
    this.id = cAnimationBase.globalId++;

    this.defaultProperties({
      state: "stopped",
      bufferCanvas: null,
      startedAt: null,
    })

    this.defaultOptions(options, {
      animator: null,
      width: null,
      height: null,
      buffered: false,
      weight: 100,
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

    run: function(timestamp) {
      this.startedAt = this.startedAt !== null ? this.startedAt : cAnimator.timestamp;
      this.timestamp = timestamp - this.startedAt;
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
      this.startedAt = null;
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

    resize: function(width, height) {
      if (this.bufferCanvas) {
        this.bufferCanvas.width = this.width ? this.width : width;
        this.bufferCanvas.height = this.height ? this.height : height;
      }
    },

    init: function() {},
    shutdown: function() {},
    animate: function() {}
  })

  return $this;
})();

// Global id for animations.
cAnimationBase.globalId = 0;





TestOOP = (function() {
  var $this = function (options) {
    // this.defaultOptions(options, {})
    this.defaultProperties({
      animations: []
    });
    this.a = Math.random() * 10;
  }

  EasyOOP.extend(null, $this, {
    name: 'TestOOP',
    animations: [],
    lastLoop: 0,

    test: function() {
      console.log(this);
    }
  });

  return $this
})();