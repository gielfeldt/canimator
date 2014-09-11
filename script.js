
$().ready(function() {

  var timeTrigger = new TimeTrigger({
    interval: 1000/30,
    callback: function() { return document.getElementById('music').currentTime; },
  });

  timeTrigger.add({
    /*
    1:    function () { myFader.start(); },
    2:    function () { myFader.start(); },
    3:    function () { myFader.start(); },
    4:    function () { myFader.start(); },
    5:    function () { myFader.start(); },
    */
    10.2: function () { myFader.start(); },
  });

  timeTrigger.enable();
/*
  // Create an animate object with our canvas.
  var animator2 = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 848,
    height: 480,
    weight: 2,
  });

  var animator = new cAnimator({
    canvas: document.createElement("canvas"),
    width: animator2.width,
    height: animator2.height,
    pre: function () {
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      animator2.canvasCtx.drawImage(this.canvas, 0, 0)
    },
  });
*/

  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 848,
    height: 480,
    weight: 2,
  });

  // Create a fadeIn animation on that animate object.
  var myFader = new cAnimationFadeIn({
    animator: animator,
    weight: 2,
    speed: -0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myFader2 = new cAnimationFadeIn({
    animator: animator,
    weight: 1,
    color: "rgba(0, 0, 0, [[opacity]])",
    speed: -0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myFader3 = new cAnimationFadeIn({
    animator: animator,
    weight: 1,
    alpha: [0, 1],
    speed: 0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myRaster = new cAnimationRasterBorder({
    animator: animator,
  });

  // Create 3 star field animations on that animate object.
  var starfield = [];
  for (var i = 1; i <= 3; i++) {
    starfield[i] = new cAnimationStarField({
      animator: animator,
      numstars: 400 / i,
      starsize: (i / 1.5) * animator.height / 360,
      dx: -0.5 * i,
      margin: myRaster.margin,
    });
  }

  var sineLUT = [];
  for (var i = 0; i < 1000; i++) {
    sineLUT[i] = Math.sin((i / 1000) * Math.PI * 2);
  }

  var sine = [];
  sine[0] = function(x) {
    // x = Math.abs((this.x - x) % this.scrollWidth);
    x = (this.x) % this.scrollWidth;
    // x = (this.x - x) % this.buffer.width;
    // console.log(x);
    // return Math.sin((x / this.scrollWidth) * Math.PI * 2) * this.sineSettings.amplitude;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  sine[1] = function(x) {
    x %= this.scrollWidth;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  sine[2] = function(x) {
    var x2 = sineLUT[parseInt((this.x % this.scrollWidth) / this.scrollWidth * 1000)] + 2;
    x = (x + this.x * x2 * 0.5) % this.scrollWidth;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  sine[3] = function(x) {
    x = (x * 3) % this.scrollWidth;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  sine[4] = function(x) {
    x = (x + this.x) % this.scrollWidth;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  sine[5] = function(x) {
    x = (x + this.x * 2) % this.scrollWidth;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  var sinePos = 5;
  // Create text scroll animation on that animate object.
  var myText = new cAnimationSinusText({
//  var myText = new textScroll({
    animator: animator,
    text: "cAnimator! The most awesomest canvas animator framework available! Peace y'all!",
    margin: myRaster.margin,
    // quality: 4,
    sine: sine[sinePos],
  });

  // Create a fadeIn animation on that animate object.
  var myBlur = new cAnimationBlur({
    animator: animator,
    strength: 2,
    weight: 10,
  });

  // Create a fadeIn animation on that animate object.
  var myInterlace = new cAnimationInterlace({
    animator: animator,
    weight: 20,
    opacity: 0.3,
    framesPerField: 3,
  });

  // Start the whole sha-bang.
  myFader2.onStart(function () {
    myBlur.start();
    myInterlace.start();
    myRaster.start();
    starfield[1].start();
    starfield[2].start();
    starfield[3].start();
    document.getElementById('music').play();
  });
  myFader2.onStop(function () {
    // myFader3.start();
    myText.start();
  });
  myFader3.onStop(function () {
    myFader.start();
    // myText.start();
  });
  myFader.onStop(function () {
    myText.start();
  });

  var direction = 1;

  myBlur.onStart(function () {
    var id = setInterval(function() {
      if (direction == -1) {
        if (myBlur.strength > 0) {
          myBlur.setStrength(myBlur.strength + direction);
        }
        else {
          direction = 1;
        }
      }
      else {
        if (myBlur.strength < 100) {
          myBlur.setStrength(myBlur.strength + direction);
        }
        else {
          myBlur.stop();
          clearInterval(id);
        }
      }
    }, 100);
  });

  $(window).keypress(function (e) {
   var charCode = (e.which) ? e.which : e.keyCode
   var charValue = String.fromCharCode(charCode);

    if (charValue == " ") {
      console.log("FADER1");
      myFader.start();
    }
    if (charCode == 13) {
      console.log("FADER2");
      myFader2.start();
    }
    if (charCode == 49) {
      console.log("pause/play test");
      myRaster.state === "paused" ? myRaster.resume() : myRaster.pause();
    }
    if (charCode == 50) {
      console.log("pause/play test");
      starfield[1].state === "paused" ? starfield[1].resume() : starfield[1].pause();
    }
    if (charCode == 51) {
      console.log("pause/play test");
      starfield[2].state === "paused" ? starfield[2].resume() : starfield[2].pause();
    }
    if (charCode == 52) {
      console.log("pause/play test");
      starfield[3].state === "paused" ? starfield[3].resume() : starfield[3].pause();
    }

    if (charCode == 53) {
      console.log("stop/start test");
      myRaster.state === "stopped" ? myRaster.start() : myRaster.stop();
    }
    if (charCode == 54) {
      console.log("stop/start field1");
      starfield[1].state === "stopped" ? starfield[1].start() : starfield[1].stop();
    }
    if (charCode == 55) {
      console.log("stop/start field2");
      starfield[2].state === "stopped" ? starfield[2].start() : starfield[2].stop();
    }
    if (charCode == 56) {
      console.log("stop/start field3");
      starfield[3].state === "stopped" ? starfield[3].start() : starfield[3].stop();
    }

    if (charValue == "e") {
      sinePos = (sinePos + 1) % sine.length;
      myText.sine = sine[sinePos];
    }

    if (charValue == "b") {
      myBlur.state === "stopped" ? myBlur.start() : myBlur.stop();
    }
    if (charValue == "n") {
      myInterlace.state === "stopped" ? myInterlace.start() : myInterlace.stop();
    }

    if (charValue == "s") {
      console.log("stop/start text");
      myText.state === "stopped" ? myText.start() : myText.stop();
    }

    if (charValue == "f") {
      console.log("fps");
      if (animator.showStats()) {
        animator.showStats(false);
      }
      else {
        animator.showStats(30);
      }
    }

    if (charValue == "m") {
      console.log("stop/start music");
      var music = document.getElementById('music');
      music.paused ? music.play() : music.pause();
    }
    
  });

});
