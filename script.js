
$().ready(function() {

  var timeTrigger = new TimeTrigger({
    interval: 1000/30,
    callback: function() { return document.getElementById('music').currentTime; },
  });

  timeTrigger.add({
    1:    function () { myFader.start(); },
    2:    function () { myFader.start(); },
    3:    function () { myFader.start(); },
    4:    function () { myFader.start(); },
    5:    function () { myFader.start(); },
    10.2: function () { myFader.start(); },
  });

  timeTrigger.enable();

  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 640,
    height: 360,
  });

  // Create a fadeIn animation on that animate object.
  var myFader = new cAnimationFadeIn({
    animator: animator,
    weight: 1,
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
    x = (x + this.x * 3) % this.scrollWidth;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  sine[3] = function(x) {
    x = (x * 3) % this.scrollWidth;
    return sineLUT[parseInt(x / this.scrollWidth * 1000)] * this.sineSettings.amplitude;
  }

  var sinePos = 0;
  // Create text scroll animation on that animate object.
  var myText = new cAnimationSinusText({
//  var myText = new textScroll({
    animator: animator,
    text: "The most awesomest cAnimator framework! Out now! Peace!",
    margin: myRaster.margin,
    quality: 2,
    sine: sine[sinePos],
  });

  // Start the whole sha-bang.
  myFader2.onStart(function () {
    // document.getElementById('music').play();
    myRaster.start();
    starfield[1].start();
    starfield[2].start();
    starfield[3].start();
  });
  myFader2.onStop(function () {
    myFader3.start();
  });
  myFader3.onStop(function () {
    myFader.start();
    // myText.start();
  });
  myFader.onStop(function () {
    myText.start();
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

    if (charValue == "s") {
      console.log("stop/start text");
      myText.state === "stopped" ? myText.start() : myText.stop();
    }

    if (charValue == "f") {
      console.log("fps");
      if (animator.fps) {
        animator.showFPS(false);
      }
      else {
        animator.showFPS(30);
      }
    }

    if (charValue == "m") {
      console.log("stop/start music");
      var music = document.getElementById('music');
      music.paused ? music.play() : music.pause();
    }
    
  });

});
