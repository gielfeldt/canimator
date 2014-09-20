cAnimationStarField = (function() {

  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);
    this.defaultOptions(options, {
      numstars: 100,
      dx: -1,
      dy: 0,
      starsize: 1,
      margin: 0,
      twitch: 0,
    });

    this.starWhite = document.createElement('canvas');
    this.starWhiteCtx = this.starWhite.getContext("2d");
    this.starWhite.width = this.starsize;
    this.starWhite.height = this.starsize;
    this.starWhiteCtx.fillStyle = "white";
    this.starWhiteCtx.fillRect(0, 0, this.starsize, this.starsize);

    this.starTwitch = document.createElement('canvas');
    this.starTwitchCtx = this.starTwitch.getContext("2d");
    this.starTwitch.width = this.starsize * (this.twitch * 2 + 1);
    this.starTwitch.height = this.starsize;

/*
    var gradient = this.bufferCtx.createLinearGradient(0, 0, (this.twitch * 2 + 1) * this.starsize, 0);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("0.5", "green");
    gradient.addColorStop("1", "blue");
    this.starTwitchCtx.fillStyle = gradient;
    this.starTwitchCtx.fillRect(0, 0, (this.twitch * 2 + 1) * this.starsize, this.starsize);
*/
    this.starTwitchCtx.fillStyle = "red";
    this.starTwitchCtx.fillRect(0, 0, this.starsize, this.starsize);
    this.starTwitchCtx.fillStyle = "green";
    this.starTwitchCtx.fillRect(this.twitch, 0, this.starsize, this.starsize);
    this.starTwitchCtx.fillStyle = "blue";
    this.starTwitchCtx.fillRect(this.twitch * 2, 0, this.starsize, this.starsize);

  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationStarField',
    stars: [],

    init: function() {
      this.stars = [];
      for (var i = 0; i < this.numstars; i++) {
        this.stars[i] = [Math.floor(Math.random() * (this.buffer.width - this.margin * 2) + this.margin), Math.floor(Math.random() * (this.buffer.height - this.margin * 2) + this.margin)];
      }
    },
    animate: function() {
      this.bufferCtx.fillStyle = "white";
      var source = this.twitch ? this.starTwitch : this.starWhite;
      for (var i = 0; i < this.numstars; i++) {
        this.stars[i][0] += this.dx;
        this.stars[i][1] += this.dy;
        // this.stars[i][1] += this.dy;
        if (this.stars[i][0] < this.margin - this.starsize) {
          this.stars[i][0] += (this.buffer.width - this.margin * 2) + this.starsize;
        }
        else if (this.stars[i][0] > this.buffer.width - this.margin) {
          this.stars[i][0] -= (this.buffer.width - this.margin * 2) + this.starsize;
        }
        if (this.stars[i][1] < this.margin - this.starsize) {
          this.stars[i][1] += (this.buffer.height - this.margin * 2) + this.starsize;
        }
        else if (this.stars[i][1] > this.buffer.height - this.margin) {
          this.stars[i][1] -= (this.buffer.height - this.margin * 2) + this.starsize;
        }

        if (this.twitch) {
          // console.log("twitch")
          /*
          this.bufferCtx.fillStyle = "red";
          this.bufferCtx.fillRect(this.stars[i][0]-6, this.stars[i][1], this.starsize, this.starsize);
          this.bufferCtx.fillStyle = "green";
          this.bufferCtx.fillRect(this.stars[i][0], this.stars[i][1], this.starsize, this.starsize);
          this.bufferCtx.fillStyle = "blue";
          this.bufferCtx.fillRect(this.stars[i][0]+6, this.stars[i][1], this.starsize, this.starsize);
          */
          // this.bufferCtx.fillRect(this.stars[i][0]-6, this.stars[i][1], this.starsize+6, this.starsize);
          this.bufferCtx.drawImage(source, this.stars[i][0] - this.twitch, this.stars[i][1]);

        }
        else {
          this.bufferCtx.fillRect(this.stars[i][0] + this.twitch, this.stars[i][1], this.starsize, this.starsize);
          // this.bufferCtx.drawImage(source, this.stars[i][0] + this.twitch, this.stars[i][1]);
          /*
          this.bufferCtx.drawImage(source, 0, 0, this.starsize, this.starsize,
            this.stars[i][0] + this.twitch, this.stars[i][1], this.starsize, this.starsize
          );
          */
        }
      }
    }
  });

  return $this;
})();
