cAnimationSinusText = (function() {
  var parent = cAnimationBase;

  // $this refers to the constructor
  var $this = function (options) {
    this.buffer = document.createElement("canvas");
    this.bufferContext = this.buffer.getContext("2d");
    this.buffer.width = 4000;
    this.buffer.height = 128;
    this.margin = 32;
    this.text = "";
    this.speed = -2;

    parent.call(this, options);

    this.speed = -this.speed;

    this.fontHeight = 64;
    this.bufferContext.font = this.fontHeight + "px verdana";
    this.bufferContext.textBaseline = "top";
    this.bufferContext.strokeStyle = 'black';
    this.bufferContext.lineWidth = 3;
    this.bufferContext.fillStyle = '#FF0000';
    this.textWidth = this.bufferContext.measureText(this.text).width;
    this.scrollWidth = this.canvas.width - (this.margin * 2);

    this.x = this.speed > 0 ? 0 : this.textWidth + this.canvas.width;
  };

  extend(parent, $this, {
    init: function() {
    },
    animate: function() {
      // Create gradient
      var gradient = this.bufferContext.createLinearGradient(0,0,this.textWidth,0);
      gradient.addColorStop("0","magenta");
      gradient.addColorStop("0.5","blue");
      gradient.addColorStop("1.0","red");
      this.bufferContext.fillStyle = gradient;
      this.bufferContext.fillText(this.text, this.scrollWidth, 0);

      var y = (this.canvas.height - this.fontHeight) / 2;
      for (var x = 0; x < this.scrollWidth; x++) {
        var yo = y + Math.sin(((this.x - x) / this.canvas.width) * Math.PI * 2 * 2) * 80;
        this.canvasContext.drawImage(this.buffer, this.x + x, 0, 1, this.fontHeight, this.margin + x, yo, 1, this.fontHeight);
      }
      this.x += this.speed;
      if (this.x > this.textWidth + this.canvas.width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = this.textWidth + this.canvas.width;
      }
      //this.stop();
    }
  });

  return $this;
})();
