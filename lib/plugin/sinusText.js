cAnimationSinusText = (function() {
  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);

    this.defaultOptions(options, {
      font: {
        height: this.canvas.height / 8,
        face: "verdana",
        strokeStyle: "black",
        lineWidth: 3,
        fillStyle: "white",
      },
      text: 1,
      speed: this.canvas.width / 424,
      margin: this.canvas.height / 15,
      repeat: true,
      quality: 1,
      amplitude: this.canvas.height / 6
    });

    this.textBuffer = document.createElement("canvas");
    this.textBufferCtx = this.textBuffer.getContext("2d");
    this.textBuffer.width = 4000;
    this.textBuffer.height = this.font.height * 2;

    this.textBufferCtx.font = this.font.height + "px " + this.font.face;
    this.textBufferCtx.textBaseline = "top";
    this.textBufferCtx.strokeStyle = this.font.strokeStyle;
    this.textBufferCtx.lineWidth = this.font.lineWidth;
    this.textBufferCtx.fillStyle = this.font.fillStyle;
    this.textWidth = this.textBufferCtx.measureText(this.text).width;
    this.scrollWidth = this.buffer.width - (this.margin * 2);

    this.x = 0;

    // Create gradient
    var gradient = this.textBufferCtx.createLinearGradient(0,0,this.textWidth,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    this.textBufferCtx.fillStyle = gradient;
    this.textBufferCtx.fillText(this.text, this.scrollWidth, 0);
  };

  EasyOOP.extend(cAnimationBase, $this, {
    animate: function() {
      var y = (this.buffer.height - this.font.height * 1.5) / 2;
      var s = this.quality;
      for (var x = 0; x < this.scrollWidth; x += s) {
        var yo = y + Math.sin(((this.x - x) / this.buffer.width) * Math.PI  * 2) * this.amplitude;
        this.bufferCtx.drawImage(this.textBuffer, this.x + x, 0, s, this.font.height * 1.5, this.margin + x, yo, s, this.font.height * 1.5);
      }
      this.x += this.speed;
      if (this.x > this.textWidth + this.buffer.width) {
        if (this.repeat) {
          this.x = 0;
        }
        else {
          this.stop();
        }
      }
    }
  });

  return $this;
})();
