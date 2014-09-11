cAnimationStarField = (function() {

  // $this refers to the constructor.
  var $this = function (options) {
    this.defaultOptions(options, {
      numstars: 100,
      dx: -1,
      dy: 0,
      starsize: 1,
      margin: 0,
    });

    this.parent().constructor(options);
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
      this.bufferCtx.fillStyle = "rgb(255, 255, 255)";
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

        this.bufferCtx.fillRect(this.stars[i][0], this.stars[i][1], this.starsize, this.starsize);
      }
    }
  });

  return $this;
})();
