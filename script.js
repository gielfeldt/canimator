
$().ready(function() {


  dancer = new Dancer();
  
/*
  kick = dancer.createKick({
    frequency: [7, 8],
    threshold: 0.05,
    onKick: function () {
      console.log("Kicking");
      myFader.start();
    },
    offKick: function () {
      // console.log("Un-Kicking");
    }
  });
*/
  dancer.onceAt( 0, function () {
    // kick.on();
  }).onceAt( 10.2, function () {
    myFader.start();
  }).onceAt( 1, function () {
    // dancer.pause();
  })
//    .fft( document.getElementById( 'fft' ) )
    .load({ src: 'skidrow_fairlight', codecs: [ 'mp3' ]})
  //  .load({ src: 'zircon_devils_spirit', codecs: [ 'mp3' ]})


/*
  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 848,
    height: 480,
    weight: 2,
  });
/*
  var myText = new cAnimationSinusText({
//  var myText = new textScroll({
    animator: animator,
    text: "cAnimator! The most awesomest canvas animator framework available! Peace y'all!",
    // margin: myRaster.margin,
    // quality: 4,
    // sine: sine[sinePos],
    quality: 1,
  });

  myText.start();

  HotKey.setChar("f", function() {
    console.log("fps");
    if (animator.showStats()) {
      animator.showStats(false);
    }
    else {
      animator.showStats(30);
    }
  });

  return;
*/

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
  var realScreen = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 848,
    height: 480,
    weight: 2,
    pre: function () {
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.canvasCtx.drawImage(tempBuffer.canvas, 0, 0, tempBuffer.canvas.width, tempBuffer.canvas.height, 0, 0, this.canvas.width, this.canvas.height)
    },
  });

  var tempBuffer = new cAnimator({
    canvas: document.createElement("canvas"),
    width: realScreen.width,
    height: realScreen.height,
  });

  var animator = realScreen;
  animator.pre = function () { this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height) }

/**/
  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 640,
    height: 400,
    weight: 102,
  });
  cAnimator.start();
  animator.start();

  // Create a fadeIn animation on that animate object.
  var myFader = new cAnimationFadeIn({
    animator: animator,
    weight: 102,
    speed: -0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myFader2 = new cAnimationFadeIn({
    animator: animator,
    weight: 101,
    color: "rgba(0, 0, 0, [[opacity]])",
    speed: -0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myFader3 = new cAnimationFadeIn({
    animator: animator,
    weight: 101,
    alpha: [0, 1],
    speed: 0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myRaster = new cAnimationRasterBorder({
    animator: animator,
  });

  // Create 3 star field animations on that animate object.
  var starfield = [];
  var dx = [];
  for (var i = 1; i <= 3; i++) {
    dx[i] = 0.5 * i,
    starfield[i] = new cAnimationStarField({
      animator: animator,
      numstars: 400 / i,
      starsize: (i / 1.5) * animator.height / 360,
      dx: dx[i],
      margin: myRaster.margin,
    });
    starfield[i].preAnimate = function() {
      this.parent().preAnimate();
    }
  }

  var myStar = new cAnimationStarField3D({
    animator: animator,
  });



  // Create a fadeIn animation on that animate object.
  var myMpeg = new cAnimationMpegArtifacts({
    animator: animator,
    duration: 2,
    weight: 114,
  });

  var sineLUT = [];
  var sineLUTres = 640-32-32;
  for (var i = 0; i < sineLUTres; i++) {
    sineLUT[i] = Math.sin((i / sineLUTres) * Math.PI * 2);
  }

  var sine = [];
  sine[0] = {
    callback: function(x) {
      // x = Math.abs((this.x - x) % this.scrollWidth);
      x = (this.x) % this.scrollWidth;
      // x = (this.x - x) % this.buffer.width;
      // console.log(x);
      // return Math.sin((x / this.scrollWidth) * Math.PI * 2) * this.sineSettings.amplitude;
      return sineLUT[Math.floor(x / this.scrollWidth * sineLUTres)] * this.amplitude;
    }
  }

  sine[1] = {
    callback: function(x) {
      x %= this.scrollWidth;
      return sineLUT[Math.floor(x / this.scrollWidth * sineLUTres)] * this.amplitude;
    }
  }

  sine[2] = {
    callback: function(x) {
      var x2 = sineLUT[Math.floor((this.x % this.scrollWidth) / this.scrollWidth * sineLUTres)] + 2;
      x = (x + this.x * x2 * 0.5) % this.scrollWidth;
      return sineLUT[Math.floor(x / this.scrollWidth * sineLUTres)] * this.amplitude;
    }
  }

  sine[3] = {
    callback: function(x) {
      x = (x * 3) % this.scrollWidth;
      return sineLUT[Math.floor(x / this.scrollWidth * sineLUTres)] * this.amplitude;
    }
  }

  sine[4] = {
    callback: function(x) {
      x = (x + this.x) % this.scrollWidth;
      return sineLUT[Math.floor(x / this.scrollWidth * sineLUTres)] * this.amplitude;
    }
  }

  sine[5] = {
    callback: function(x) {
      x = (x + this.x * 2) % this.scrollWidth;
      return sineLUT[Math.floor(x / this.scrollWidth * sineLUTres)] * this.amplitude;
    }
  }

  sine[6] = {
    maxAmplitude: 80,
    lastX: 0,
    amplitudeSpeed: 1,
    amplitude: 0,
    callback: function(x) {
      if (this.x != this.sine.lastX) {
        this.sine.amplitude += this.sine.amplitudeSpeed;
        if (this.sine.amplitude < -this.sine.maxAmplitude || this.sine.amplitude > this.sine.maxAmplitude) {
          this.sine.amplitudeSpeed = -this.sine.amplitudeSpeed;
        }
        this.sine.lastX = this.x;
        /*
          var gradient = this.textBufferCtx.createLinearGradient(0,0,this.textWidth,0);
          for (var i = 0; i < myRaster.steps; i++) {
            gradient.addColorStop((Math.round(i + this.x / 100) % 32) / 31, myRaster.clut[i]);
          }
          this.textBufferCtx.fillStyle = gradient;
          */
          // this.textBufferCtx.fillText(this.text, this.scrollWidth, 0);

      }
      var posAmp = x / this.scrollWidth * 80;
      x = (x * 2 + this.x * 6) % this.scrollWidth;
      return sineLUT[Math.floor(x / this.scrollWidth * sineLUTres)] * posAmp;
    }
  }

  var sinePos = 6;
  // Create text scroll animation on that animate object.
  var myText = new cAnimationSinusText({
//  var myText = new textScroll({
    animator: animator,
    text: "cAnimator! The most awesomest canvas animator framework available! Peace y'all!",
    margin: myRaster.margin,
    // quality: 4,
    sine: sine[sinePos],
    quality: 1,
    //speed: 0.1,
  });

  myText.font.gradient = function(gradient, pos) {
    console.log("POS: " + pos);
    for (var i = 0; i < myRaster.steps; i++) {
      // pos = (Math.floor(this.x / (this.textWidth + this.scrollWidth) * 31) + i) % 32;
      gradient.addColorStop(i / 31, myRaster.clut[(pos + i) % 32]);
      console.log((pos + i) % 32);
    }
  }
  // myText.renderTextBuffer();

  // Create a fadeIn animation on that animate object.
  var myBlur = new cAnimationBlur({
    animator: animator,
    strength: 0.2,
    weight: 110,
  });

  // Create a fadeIn animation on that animate object.
  var myInterlace = new cAnimationInterlace({
    animator: animator,
    weight: 120,
    opacity: 0.3,
    // barsize: 10,
    framesPerField: 3,
  });

  var myBlind = new cAnimationBlinds({
    animator: animator,
    weight: 115,
  });

  var myStatic = new cAnimationStatic({
    animator: animator,
    weight: 12,
  });

  var mySkew = new cAnimationSkewArtifacts({
    animator: animator,
    weight: 125,
  });

  var myRotate = new cAnimationRotate({
    animator: animator,
    weight: 125,
  });


  var myPlasma = new cAnimationPlasma({
    animator: animator,
  });

  myStatic.onStart(function () {
    document.getElementById('static').play();
  });
  myStatic.onStop(function () {
    document.getElementById('static').pause();
    document.getElementById('static').currentTime = 0;
  });

  // Start the whole sha-bang.
  myFader2.onStart(function () {
    // myBlur.start();
    myInterlace.start();
    myRaster.start();
    starfield[1].start();
    starfield[2].start();
    starfield[3].start();
    // document.getElementById('music').play();
    //while (!dancer.isLoaded());
    // dancer.play();
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

/*
  myBlur.onStart(function () {
    console.log("TEST");
    var id = setInterval(function() {
      if (myBlur.strength < 100) {
        myBlur.setStrength(myBlur.strength * 1.2);
      }
      else {
        console.log("NOBLUR");
        myBlur.stop();
        myBlur.setStrength(0);
        clearInterval(id);
      }
    }, 100);
  });
*/
  HotKey.setChar(" ", function () {
    console.log("FADER1");
    myFader.start();
  });
  HotKey.setCode(13, function () {
    console.log("FADER2");
    myFader2.start();
  });
  HotKey.setChar("1", function () {
    console.log("pause/play test");
    myRaster.state === "paused" ? myRaster.resume() : myRaster.pause();
  });
  HotKey.setChar("2", function () {
    console.log("pause/play test");
    starfield[1].state === "paused" ? starfield[1].resume() : starfield[1].pause();
  });
  HotKey.setChar("3", function () {
    console.log("pause/play test");
    starfield[2].state === "paused" ? starfield[2].resume() : starfield[2].pause();
  });
  HotKey.setChar("4", function () {
    console.log("pause/play test");
    starfield[3].state === "paused" ? starfield[3].resume() : starfield[3].pause();
  });
  HotKey.setChar("5", function () {
    console.log("stop/start test");
    myRaster.state === "stopped" ? myRaster.start() : myRaster.stop();
  });
  HotKey.setChar("6", function () {
    console.log("stop/start field1");
    starfield[1].state === "stopped" ? starfield[1].start() : starfield[1].stop();
  });
  HotKey.setChar("7", function () {
    console.log("stop/start field2");
    starfield[2].state === "stopped" ? starfield[2].start() : starfield[2].stop();
  });
  HotKey.setChar("8", function () {
    console.log("stop/start field3");
    starfield[3].state === "stopped" ? starfield[3].start() : starfield[3].stop();
  });
  HotKey.setChar("e", function () {
    sinePos = (sinePos + 1) % sine.length;
    myText.sine = sine[sinePos];
  });
  HotKey.setChar("b", function () {
    myBlur.state === "stopped" ? myBlur.start() : myBlur.stop();
  });
  HotKey.setChar("q", function () {
    myPlasma.state === "stopped" ? myPlasma.start() : myPlasma.stop();
    //myStar.state === "stopped" ? myStar.start() : myStar.stop();
  });
  HotKey.setChar("n", function () {
    myInterlace.state === "stopped" ? myInterlace.start() : myInterlace.stop();
  });
  HotKey.setChar("s", function () {
    console.log("stop/start text");
    myText.state === "paused" ? myText.resume() : myText.pause();
    // myText.state === "stopped" ? myText.start() : myText.stop();
  });
  HotKey.setChar("f", function () {
    console.log("fps");
    if (animator.showStats()) {
      animator.showStats(false);
    }
    else {
      animator.showStats(30);
    }
  });
  HotKey.setChar("g", function () {
    myBlind.start();
  });
  HotKey.setChar("a", function () {
    myStatic.duration = Math.floor(Math.random() * 1000);
    myStatic.start();
  });
  HotKey.setChar("d", function () {
    myMpeg.state === "stopped" ? myMpeg.start() : myMpeg.stop();
  });
  HotKey.setChar("h", function () {
    mySkew.state === "stopped" ? mySkew.start() : mySkew.stop();
  });
  HotKey.setChar("r", function () {
    myRotate.state === "stopped" ? myRotate.start() : myRotate.stop();
  });
  HotKey.setChar("m", function () {
    console.log("stop/start music");
    // dancer.isPlaying() ? dancer.pause() : dancer.play();
    // return;
    var music = document.getElementById('music');
    music.paused ? music.play() : music.pause();
  });
  HotKey.setChar("p", function () {
    animator.isRunning() ? animator.stop() : animator.start();
  });
  HotKey.setChar("w", function () {
    /*
    var canvas = fx.canvas();
    var texture = canvas.texture(document.getElementById("mainscreen"));
    canvas.draw(texture).sepia(1).update();
    */
    var canvas = myText.textBuffer;
    var scr = document.getElementById("mainscreen");
    var ctx = scr.getContext("2d");
    ctx.clearRect(0, 0, scr.width, scr.height);
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, scr.width, scr.height);
  });
  HotKey.setChar("-", function () {
    myText.quality -= 1;
    if (myText.quality < 1) myText.quality = 1;
    console.log(myText.quality);
    return;
    myBlur.strength -= 0.05;
    if (myBlur.strength < 0) myBlur.strength = 0;
    console.log(myBlur.strength);
  });
  HotKey.setChar("+", function () {
    myText.quality += 1;
    if (myText.quality > 50) myText.quality = 50;
    console.log(myText.quality);
    return;
    myBlur.strength += 0.05;
    if (myBlur.strength > 50) myBlur.strength = 50;
    console.log(myBlur.strength);
  });
   

  console.log("DONE"); 
});
