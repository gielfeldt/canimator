cAnimationSinusText = (function() {
  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);

    this.defaultOptions(options, {
      font: {
        height: this.canvas.height / 8,
        family: "verdana",
        strokeStyle: "black",
        lineWidth: 3,
        fillStyle: "white",
        gradient: function (gradient) {
          gradient.addColorStop("0","magenta");
          gradient.addColorStop("0.5","blue");
          gradient.addColorStop("1.0","red");
        },
      },
      text: 1,
      speed: this.canvas.width / 320,
      margin: this.canvas.height / 15,
      repeat: true,
      quality: this.canvas.width / 320,
      amplitude: this.canvas.height / 6,
      sine: {
        callback: function(x) {
          return Math.sin(((this.x - x) / this.scrollWidth) * Math.PI * 2) * this.amplitude;
        }
      },
    });

    this.textBuffer = document.createElement("canvas");
    this.textBufferCtx = this.textBuffer.getContext("2d");
    this.textBuffer.width = 4000;
    this.textBuffer.height = this.font.height * 2;

    this.scrollWidth = this.buffer.width - (this.margin * 2);

    this.setupFont();
    this.textBuffer.width = Math.ceil(this.textWidth) + this.scrollWidth;
    // Messing with the canvas width resets the context, so we need to setup
    // the font again.
    this.setupFont();

    this.x = 0;

    // Create gradient
    var gradient = this.textBufferCtx.createLinearGradient(0,0,this.textWidth,0);
    this.font.gradient.call(this, gradient);
    this.textBufferCtx.fillStyle = gradient;
    this.textBufferCtx.fillText(this.text, this.scrollWidth, 0);
  };

  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationSinusText',
    setupFont: function() {
      this.textBufferCtx.font = this.font.height + "px " + this.font.family;
      this.textBufferCtx.textBaseline = "top";
      this.textBufferCtx.strokeStyle = this.font.strokeStyle;
      this.textBufferCtx.lineWidth = this.font.lineWidth;
      this.textBufferCtx.fillStyle = this.font.fillStyle;
      this.textWidth = this.textBufferCtx.measureText(this.text).width;
    },
    animate: function() {
      var center = (this.buffer.height - this.font.height * 1.5) / 2;
      for (var x = 0; x < this.scrollWidth; x += this.quality) {
        var y = center + this.sine.callback.call(this, x);
        var width = Math.min(this.scrollWidth - x, this.quality);
        this.bufferCtx.drawImage(this.textBuffer, this.x + x, 0, width, this.font.height * 1.5, this.margin + x, y, width, this.font.height * 1.5);
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
