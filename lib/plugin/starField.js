cAnimationStarField = (function() {
  var parent = cAnimationBase;

  // $this refers to the constructor
  var $this = function (options) {
    // console.log(options);
    this.numstars = 0;
    this.stars = [];
    this.dx = 0;
    this.dy = 0;
    this.starsize = 0;
    this.margin = 0;

    parent.call(this, options);
  };

  extend(parent, $this, {
    init: function() {
      this.stars = [];
      for (var i = 0; i < this.numstars; i++) {
        this.stars[i] = [Math.random() * (this.canvas.width - this.margin * 2) + this.margin, Math.random() * (this.canvas.height - this.margin * 2) + this.margin];
      }
    },
    animate: function() {
      // this.canvasContext.fillStyle = RGB2Color(255, 255, 255);
      this.canvasContext.fillStyle = "rgb(255, 255, 255)";
      for (var i = 0; i < this.numstars; i++) {
        this.stars[i][0] += this.dx;
        this.stars[i][1] += this.dy;
        // this.stars[i][1] += this.dy;
        if (this.stars[i][0] < this.margin) {
          this.stars[i][0] += (this.canvas.width - this.margin * 2);
        }
        else if (this.stars[i][0] > this.canvas.width - this.margin) {
          this.stars[i][0] -= (this.canvas.width - this.margin * 2);
        }
        if (this.stars[i][1] < this.margin) {
          this.stars[i][1] += (this.canvas.height - this.margin * 2);
        }
        else if (this.stars[i][1] > this.canvas.height - this.margin) {
          this.stars[i][1] -= (this.canvas.height - this.margin * 2);
        }

        this.canvasContext.fillRect(this.stars[i][0], this.stars[i][1], this.starsize, this.starsize);
      }
      // this.stop();
      // buffer.drawImage(this.canvas, 0, 0);
    }
  });

  return $this;
})();
