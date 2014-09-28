cAnimationVRes = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      factor: null,
      vwidth: null,
      height: null,
      smooth: true,
    });

    if (this.factor) {
      this.setFactor(this.factor)
    }

    this.resBuffer = document.createElement('canvas');
    this.resBuffer.width = this.buffer.width
    this.resBuffer.height = this.buffer.height
    this.resCtx = this.resBuffer.getContext("2d")
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationVRes',

    setFactor: function (factor) {
      this.factor = factor > 1 ? 1 : (factor < 0 ? 0 : factor)
      this.width = this.buffer.width * this.factor
      this.height = this.buffer.height * this.factor
    },

    setSize: function(width, height) {
      this.factor = null
      this.width = width
      this.height = height
    },

    animate: function() {
      if (this.width && this.height) {
        var oldSmooth1 = this.bufferCtx.getImageSmoothing();
        var oldSmooth2 = this.resCtx.getImageSmoothing();
        this.bufferCtx.setImageSmoothing(this.smooth);
        this.resCtx.setImageSmoothing(this.smooth);

        this.resCtx.clearRect(0, 0, this.width, this.height)
        this.resCtx.drawImage(this.buffer,
          0, 0, this.buffer.width, this.buffer.height,
          0, 0, this.width, this.height
        )

        this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height)
        this.bufferCtx.drawImage(this.resBuffer,
          0, 0, this.width, this.height,
          0, 0, this.buffer.width, this.buffer.height
        )

        this.bufferCtx.setImageSmoothing(oldSmooth1);
        this.resCtx.setImageSmoothing(oldSmooth2);
      }
    },

    pause: function() {
      this.state = "paused";
    },

    resume: function() {
      this.state = "running";
    }

  });

  return $this;
})();
