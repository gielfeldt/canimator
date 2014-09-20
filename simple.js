
$().ready(function() {
/*
  var timeTrigger = new TimeTrigger({
    interval: 1000/30,
    callback: function() { return document.getElementById('music').currentTime; },
  });

  timeTrigger.add({
    10.2: function () { myFader.start(); },
  });

  timeTrigger.enable();
*/
  // Create an animate object with our canvas.
  var animator = new cAnimator({
    canvas: document.getElementById("mainscreen"),
    width: 1280,
    height: 800,
    weight: 2,
  });
  animator.start();
/*
  // Create a fadeIn animation on that animate object.
  var myStatic = new cAnimationStatic({
    animator: animator,
    weight: 13,
  });
  myStatic.onStart(function () {
    document.getElementById('static').play();
  });
  myStatic.onStop(function () {
    document.getElementById('static').pause();
    document.getElementById('static').currentTime = 0;
  });
*/
  myFade = new cAnimationFadeIn({
    animator: animator,
    weight: 2,
    speed: -0.01,
  });

  // Create a fadeIn animation on that animate object.
  var myInterlace = new cAnimationInterlace({
    animator: animator,
    weight: 20,
    opacity: 0.3,
    barsize: 2,
    frequency: 59.94,
    // frequency: 59.94 / 2,
  });

  // Create 3 star field animations on that animate object.
  var starfield = [];
  var dx = [];
  for (var i = 1; i <= 3; i++) {
    dx[i] = 0.01 * i,
    starfield[i] = new cAnimationStarField({
      animator: animator,
      numstars: 400 / i * i,
      starsize: (i / 1.5) * animator.height / 360,
      dx: dx[i],
    });
    starfield[i].preAnimate = function() {
      this.parent().preAnimate();
    }

  }
/**/
  // Create a fadeIn animation on that animate object.
  var myStarWars = new cAnimationStarWars({
    weight: 3,
    animator: animator,
    text: [
"It is a period of civil war. Rebel",
"spaceships, striking from a hidden",
"base, have won their first victory",
"against the evil Galactic Empire.",
"",
"During the battle, rebel spies managed",
"to steal secret plans to the Empire's",
"ultimate weapon, the Death Star, an",
"armored space station with enough",
"power to destroy an entire planet.",
"",
"Pursued by the Empire's sinister agents,",
"Princess Leia races home aboard her",
"starship, custodian of the stolen plans",
"that can save her people and restore",
"freedom to the galaxy..."
    ],
  });
/**/
  starfield[1].start();
  starfield[2].start();
  starfield[3].start();

  var twitch = 0;

  HotKey.setChar("f", function () {
    if (animator.showStats()) {
      animator.showStats(false);
    }
    else {
      animator.showStats(30);
    }
  });
  HotKey.setChar("s", function () {
    myStarWars.state === "running" ? myStarWars.pause() : myStarWars.start();
    console.log(myStarWars.angle);
  });
  HotKey.setChar(" ", function () {
    myStatic.duration = Math.floor(Math.random() * 1000);
    myStatic.start();
  });
  HotKey.setChar("t", function () {
    if (twitch) {
      twitch = 0;
    }
    else {
      twitch = 3;
    }
    for (var i in starfield) {
      starfield[i].twitch = twitch;
    }
    console.log(twitch);
  });
  HotKey.setChar(" ", function () {
    myFade.start();
  });
  HotKey.setChar("i", function () {
    myInterlace.state === "stopped" ? myInterlace.start() : myInterlace.stop();
  });

  console.log("DONE"); 
});
