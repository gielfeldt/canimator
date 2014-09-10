
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

  var buffer = document.createElement("canvas");
  buffer.width = 640;
  buffer.height = 360;

  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: buffer,
    width: buffer.width,
    height: buffer.height,
  });

  // Create an animate object with our canvas.
  var animator2 = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    pre: function () { 
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.canvasCtx.drawImage(buffer, 0, 0, buffer.width, buffer.height, 0, 0, this.canvas.width / 2, this.canvas.height / 2) 
      this.canvasCtx.drawImage(buffer, 0, 0);
    },
    width: buffer.width,
    height: buffer.height,
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
    color: "rgb(0, 0, 0)",
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
      starsize: (i / 1.5) * buffer.height / 360,
      dx: -0.5 * i,
      margin: myRaster.margin,
    });
  }

  // Create text scroll animation on that animate object.
  var myText = new cAnimationSinusText({
//  var myText = new textScroll({
    animator: animator,
    text: "The most awesomest cAnimator framework! Out now! Peace!",
    margin: myRaster.margin,
    quality: 2,
  });

  // Start the whole sha-bang.
  myFader2.onStart(function () {
    document.getElementById('music').play();
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

    if (charValue == "s") {
      console.log("stop/start text");
      myText.state === "stopped" ? myText.start() : myText.stop();
    }

    if (charValue == "f") {
      console.log("fps");
      if (animator2.fps) {
        animator2.showFPS(false);
      }
      else {
        animator2.showFPS(30);
      }
    }

    if (charValue == "m") {
      console.log("stop/start music");
      var music = document.getElementById('music');
      music.paused ? music.play() : music.pause();
    }
    
  });

});
