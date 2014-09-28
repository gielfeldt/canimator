Math.randSeed = 0;
Math.randLUT = [];
Math.randLUTSize = 10000
for (var i = 0; i < Math.randLUTSize; i++) {
  Math.randLUT[i] = Math.random();
}

Math.randomFixed = function() {
  return Math.randLUT[(Math.randSeed++) % Math.randLUTSize]
}

$().ready(function() {

  var map = document.getElementById("map")
  var mainscreen = document.getElementById("mainscreen")
  var viewport = document.getElementById("viewport")
  var x = 0;
/*
  // Create an animate object with our canvas.
  var map = new cAnimator({
    canvas: map,
    width: 320,
    height: 200,
    weight: 100,
    viewport: viewport,
    maintainAspectRatio: false,
  });
*/
  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: mainscreen,
    width: 640,
    height: 400,
    weight: 200,
    viewport: viewport,
    //maintainAspectRatio: false,
  });

  cAnimator.start();
  animator.start();
  //map.start();
/*
  viewport = document.getElementById("viewport");
  (window.onorientationchange = window.onresize = function(canvas){
    var mw = Infinity;
    var mh = Infinity;
    var min = Math.min;
    var max = Math.max;

    return function(w,h) {
      if (arguments.length === 2) {
        mw = w;
        mh = h;
      }

      var width = min(mw, innerWidth);
      var height = min(mh, innerHeight);
      console.log(width + " x " + height);

      var newwidth = width
      var newheight = height

      var ratio = newwidth / newheight;
      console.log(ratio);
      if (ratio < 1.6) {
        newheight = newwidth / 1.6
      }

      console.log(newwidth + " x " + newheight);

      var gap = height - newheight
      // var ch = min(newheight, 360)
      var ch = 400
      var cw = ch * newwidth / newheight
      animator.resize(cw, ch)
      viewport.style.width = newwidth + "px" 
      viewport.style.height = newheight + "px"
      viewport.style.top = Math.round(gap / 2) + "px"
      mainscreen.style.width = ((mainscreen.width / mainscreen.height) * newheight) + "px" 
      mainscreen.style.height = newheight + "px"
     
    };
  }(mainscreen))();
*/
  // Create a fadeIn animation on that animate object.
  var myLevel = new cAnimationLevel({
    animator: animator,
    weight: 0,
  });

  // Create a fadeIn animation on that animate object.
  var myInterlace = new cAnimationInterlace({
    animator: animator,
    weight: 200,
    opacity: 0.3,
    barsize: 1,
    frequency: 0,
  });

  // Create a fadeIn animation on that animate object.
  var myFader = new cAnimationFadeIn({
    animator: animator,
    weight: 110,
    speed: -0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myVRes = new cAnimationVRes({
    animator: animator,
    weight: 140,
    factor: 0.2,
    //width: 160,
    //height: 100,
    smooth: false,
  });

/**
  var s = 40
  for (var i = 0; i < 50; i++) {
    $cloudgen.drawCloud(context,
      Math.random() * mainscreen.width,
      Math.random() * mainscreen.height - (s * 2) / 4 + s,
      s / 1.5
    )
  }

/*
  var x = 0;
  setInterval(function() {
    mainscreen.style.marginLeft = -x + "px"
    x++;
  }, 1000/30)
/**/


  myLevel.start();
  //myInterlace.start()

  HotKey.setEvent(37, function() {myLevel.moveLeft()}, function() {myLevel.moveStop()});
  HotKey.setEvent(39, function() {myLevel.moveRight()}, function() {myLevel.moveStop()});

  HotKey.setChar("f", function () {
    if (animator.showStats()) {
      //map.showStats(false);
      animator.showStats(false);
    }
    else {
      //map.showStats(30);
      animator.showStats(30);
    }
  });

  HotKey.setChar(" ", function () {
    myFader.start();
  });
  HotKey.setChar("i", function () {
    myInterlace.state === "stopped" ? myInterlace.start() : myInterlace.stop();
  });
  HotKey.setChar("r", function () {
    myVRes.state === "stopped" ? myVRes.start() : myVRes.stop();
  });
  HotKey.setChar("I", function () {
    myInterlace.frequency = myInterlace.frequency ? 0 : 60
  });

  HotKey.setChar("+", function () {
    console.log(myVRes.factor);
    myVRes.setFactor(myVRes.factor + 0.01)
  });

  HotKey.setChar("-", function () {
    console.log(myVRes.factor);
    myVRes.setFactor(myVRes.factor - 0.01)
  });

  HotKey.setChar("p", function () {
    console.log("pause/resume");
    animator.paused ? animator.resume() : animator.pause();
  });
  HotKey.setChar("s", function () {
    console.log("start/stop");
    animator.isRunning() ? animator.stop() : animator.start();
  });
});
