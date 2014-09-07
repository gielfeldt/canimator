

$().ready(function() {
  // Play that funky music, baby.
  // document.getElementById('music').play();

  // Create an animate object with our canvas.
  var animate = animateCanvas.initialize({
    canvas: document.getElementById("main"),
    width: 640,
    height: 360,
  });

  // Create a fadeIn animation on that animate object.
  var myFader = new fadeIn({
    animateCanvas: animate,
    weight: 1
  });

  // Create 3 star field animations on that animate object.
  var starfield = [];
  for (var i = 1; i <= 3; i++) {
    starfield[i] = new starField({
      animateCanvas: animate,
      numstars: 100,
      starsize: i,
      dx: -1 * i,
      margin: 32,
    });
  }

  // Create a rastor border animation on that animate object.
  var myRaster = new rasterBorder({
    animateCanvas: animate,
  });

  // Create text scroll animation on that animate object.
  var myText = new sinusText({
//  var myText = new textScroll({
    animateCanvas: animate,
    text: "cAnimator makes it easy",
  });

  // Start the whole sha-bang.
  myFader.start();
  myRaster.start();

  starfield[1].start();
  starfield[2].start();
  starfield[3].start();

  myText.start();

  $(window).keypress(function(e) {
    if (e.keyCode == 0 || e.keyCode == 32) {
      myFader.start();
    }
  });

});
