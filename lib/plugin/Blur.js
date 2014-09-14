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

    // Example:
    try {
        this.filter = new WebGLImageFilter();
        // this.filter.addFilter('blur', 40);
        this.filter.addFilter('emboss');
        // this.filter.addFilter('convolution', [0, 1, 0, 1, 0, 1, 0, 1, 0]);
        // this.filter.addFilter('brightness', -0.3);
    }
    catch( err ) {
        // Handle browsers that don't support WebGL
        this.filter = null;
    }

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
      //this.filter.addFilter('hue', 180);
      //this.filter.addFilter('negative');
      var filteredImage = this.filter.apply(this.buffer);

      // The 'filteredImage' is a canvas element. You can draw it on a 2D canvas
      // or just add it to your DOM

      // Use .reset() to clear the current filter chain. This is faster than creating a new
      // WebGLImageFilter instance
      // this.filter.reset();
      this.bufferCtx.drawImage(filteredImage, 0, 0);

      return;
      /**/
      var img = this.bufferCtx.getImageData(0, 0, this.buffer.width, this.buffer.height);
      /*
      for (var y = 0; y < this.buffer.height; y++) {
        for (var x = 0; x < this.buffer.width; x++) {
          var pos = y * 4 * this.buffer.width + x * 4;
          img.data[pos + 0] = 255 - img.data[pos + 0];
          img.data[pos + 1] = 255 - img.data[pos + 1]
          img.data[pos + 2] = 255 - img.data[pos + 2]
          // img.data[pos + 3] = 255;
        }
      }
      */
      // this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
      this.bufferCtx.putImageData(img, 0, 0);
      /**/

      /*
      this.blurCtx.clearRect(0, 0, this.blurWidth, this.blurHeight);
      this.blurCtx.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height, 0, 0, this.blurWidth, this.blurHeight);
      this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
      this.bufferCtx.drawImage(this.blur, 0, 0, this.blurWidth, this.blurHeight, 0, 0, this.buffer.width, this.buffer.height);
      /**/
    }
  });

  return $this;
})();


cAnimationBlur2 = (function() {
  // $this refers to the constructor.
  var $this = function (options) {
    console.log("constructing");
    this.parent().constructor(options);

    this.defaultOptions(options, {
      strength: 0.5,
    });

    console.log("fx canvas");
    // Example:
    try {
      this.fx = fx.canvas();
      // this.fx.replace(this.buffer);
      this.texture = this.fx.texture(this.buffer);
    }
    catch( err ) {
      console.log(err);
      // Handle browsers that don't support WebGL
      this.fx = null;
    }

  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationBlur2',
    animate: function () {
      // console.log('animating');
      // convert the image to a texture
      this.texture.loadContentsOf(this.buffer);
      // draw it
      // this.fx.draw(this.texture).sepia(1).update();
      this.fx.draw(this.texture).zoomBlur(this.buffer.width / 2, this.buffer.height / 2, this.strength).update();
      // this.fx.draw(this.texture).lensBlur(this.strength, 0.75, 0).update();
      this.bufferCtx.drawImage(this.fx, 0, 0)
      // this.fx.draw(this.texture).triangleBlur(28).update();
      // this.fx.replace(this.buffer);
    }
  });

  return $this;
})();
