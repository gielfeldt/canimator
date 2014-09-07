cAnimationTextScroll = (function() {
  var parent = cAnimationBase;

  // $this refers to the constructor
  var $this = function (options) {
    this.buffer = document.createElement("canvas");
    this.bufferContext = this.buffer.getContext("2d");
    this.buffer.width = 4000;
    this.buffer.height = 120;
    this.margin = 32;
    this.text = "";
    this.speed = -2;
    this.y = null;

    parent.call(this, options);

    if (!this.y) {
      this.y = this.canvas.height / 2;
    }

    this.speed = -this.speed;

    this.bufferContext.font = 36 + "px verdana";
    this.bufferContext.textBaseline = "top";
    this.bufferContext.strokeStyle = 'black';
    this.bufferContext.lineWidth = 3;
    this.bufferContext.fillStyle = '#FF0000';
    this.textWidth = this.bufferContext.measureText(this.text).width;
    this.scrollWidth = this.canvas.width - (this.margin * 2);
    this.bufferContext.fillText(this.text, this.scrollWidth, 0);
    this.x = this.speed > 0 ? 0 : this.textWidth + this.canvas.width;
  };

  extend(parent, $this, {
    init: function() {
    },
    animate: function() {
      this.canvasContext.drawImage(this.buffer, this.x, 0, this.scrollWidth, 36, this.margin, this.y, this.scrollWidth, 36);
      this.x += this.speed;
      if (this.x > this.textWidth + this.canvas.width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = this.textWidth + this.canvas.width;
      }
    }
  });

  return $this;
})();
