cAnimationBlur = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      strength: 50,
    });

    this.blur = document.createElement("canvas");
    this.blurCtx = this.blur.getContext("2d");
    this.blur.width = this.buffer.width;
    this.blur.height = this.buffer.height;
    this.setStrength(this.strength);
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationBlur',
    setStrength: function (strength) {
      this.strength = Math.min(strength, 100);
      this.blurWidth = Math.floor(this.buffer.width * this.strength / 100);
      this.blurHeight = Math.floor(this.buffer.height * this.strength / 100);
      // console.log(this.blurWidth + " x " + this.blurHeight);
      //console.log(this.blurWidth);
      //console.log(this.blurHeight);
    },

    animate: function () {
      /*
      var img = this.bufferCtx.getImageData(0, 0, this.buffer.width, this.buffer.height);
      // console.log(img.data);
      for (var y = 0; y < this.buffer.height; y++) {
        for (var x = 0; x < this.buffer.width; x++) {
          var pos = y * 4 * this.buffer.width + x * 4;
          img.data[pos + 0] = 255;
          img.data[pos + 1] = 255; // Math.floor(Math.random() * 255);
          img.data[pos + 2] = 255;
          img.data[pos + 3] = 0;
        }
      }
      // this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
      this.bufferCtx.putImageData(img, 0, 0);
      /**/
      /**/
      this.blurCtx.clearRect(0, 0, this.blurWidth, this.blurHeight);
      this.blurCtx.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height, 0, 0, this.blurWidth, this.blurHeight);
      this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
      this.bufferCtx.drawImage(this.blur, 0, 0, this.blurWidth, this.blurHeight, 0, 0, this.buffer.width, this.buffer.height);
      /**/
    }
  });

  return $this;
})();
