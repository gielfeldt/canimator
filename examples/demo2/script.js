

$().ready(function() {
  // Play that funky music, baby.
  // document.getElementById('music').play();

  var fired = false;

  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 1280,
    height: 720,
  });

  // Create a fadeIn animation on that animate object.
  var myFader = new cAnimationFadeIn({
    cAnimator: animator,
    weight: 1
  });

  // Create 3 star field animations on that animate object.
  var starfield = [];
  for (var i = 1; i <= 3; i++) {
    starfield[i] = new cAnimationStarField({
      cAnimator: animator,
      numstars: 800 / i,
      starsize: i,
      dx: -1 * i * 2,
      margin: 64,
    });
  }

  // Create a rastor border animation on that animate object.
  var myRaster = new cAnimationRasterBorder({
    cAnimator: animator,
    margin: 64,
  });

  // Create text scroll animation on that animate object.
  var myText = new cAnimationSinusText({
//  var myText = new textScroll({
    cAnimator: animator,
    text: "Autoslave 2.x work in progress! Stay tuned! It will be awesome!",
    margin: 64,
  });

  var triggers = {
    1:  { callback: function() { myFader.start(); } },
    2:  { callback: function() { myFader.start(); } },
    3:  { callback: function() { myFader.start(); } },
    4:  { callback: function() { myFader.start(); } },
    5:  { callback: function() { myFader.start(); } },
    10.2: { callback: function() { myFader.start(); } },
  };



  var chunkedTriggers = [];
  for (var i in triggers) {
    if (!chunkedTriggers[parseInt(i)]) {
      chunkedTriggers[parseInt(i)] = {};
    }
    chunkedTriggers[parseInt(i)][i] = triggers[i];
  }
  var fired = {};

  runTriggers = function(e) {
    currentTime = e.currentTime;
    var idx = parseInt(currentTime);
    if (chunkedTriggers[idx]) {
      for (var i in chunkedTriggers[idx]) {
        if (!chunkedTriggers[idx][i].fired && currentTime >= i) {
          chunkedTriggers[idx][i].fired = true;
          chunkedTriggers[idx][i].callback();
          console.log(currentTime);
        }
      }
    }
  }

/**/
  var music = document.getElementById('music');
  setInterval(function() {
    runTriggers(music);
  }, 1000 / 30);
/**/
/*
  $("#music").on("timeupdate", function() {
    runTriggers(this);
  });
*/
  // Start the whole sha-bang.
  // myFader.start();
  myRaster.start();

  starfield[1].start();
  starfield[2].start();
  starfield[3].start();

  myText.start();

/*
  var animate2 = cAnimator.initialize({
    canvas: document.getElementById("mainscreen2")
  });


  starfield[1000] = new starField({
    animator: animate2,
    numstars: 200,
    starsize: 5,
    dx: 5,
    dy: 5,
    margin: 0,
  });

  var myText2 = new textScroll({
    animator: animate2,
    text: "Goodbye world",
    speed: 2,
    margin: 0,
  });

  starfield[1000].start();
  myText2.start();
*/
  $(window).keypress(function(e) {
    var code = e.keyCode || e.which;
    if (code == 0 || code == 32) {
      myFader.start();
      console.log("HERE");
    }
    if (code == 49) {
      console.log("pause/play fader");
      myFader.pausePlay();
    }
    if (code == 50) {
      console.log("pause/play raster");
      myRaster.pausePlay();
    }
    if (code == 51) {
      console.log("pause/play text");
      myText.pausePlay();
    }
    if (code == 52) {
      console.log("pause/play starfield1");
      starfield[1].pausePlay();
    }
    if (code == 53) {
      console.log("pause/play starfield2");
      starfield[2].pausePlay();
    }
    if (code == 54) {
      console.log("pause/play starfield3");
      starfield[3].pausePlay();
    }
    if (code == 55) {
      console.log("play music");
      document.getElementById('music').play();
    }
    if (code == 56) {
      console.log("stop music");
      document.getElementById('music').pause();
    }
    if (code == 57) {
      console.log("fps");
      if (animator.fps) {
        animator.showFPS(false);
      }
      else {
        animator.showFPS(30);
      }
    }
    
  });

});
