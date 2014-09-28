cAnimationRotate = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultProperties({
      field: 0,
      steps: [],
    });

    this.defaultOptions(options, {
      blocksize: this.canvas.height / 24,
    });

    this.filter = document.createElement("canvas");
    this.filterCtx = this.filter.getContext("2d");
    this.filter.width = this.buffer.width;
    this.filter.height = this.buffer.height;
    this.o = 0;
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationRotate',

    makeSteps: function() {
      var y = 0;
      this.steps = [];
      do {
        var h = Math.ceil(Math.random() * 10);
        this.steps.push([y, h]);
        y += h;
      } while (y < this.buffer.height);
      this.scale = 1;
      this.scaleStep = -0.01;
      this.o = 0;
    },

    animate: function() {
      this.filterCtx.clearRect(0, 0, this.filter.width, this.filter.height);
      this.filterCtx.drawImage(this.buffer, 0, 0);

      this.bufferCtx.save();
      this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
      this.bufferCtx.translate(this.buffer.width / 2, this.buffer.height / 2);
      this.bufferCtx.rotate(this.o);
      this.scale += this.scaleStep;
      if (this.scale < 0 || this.scale > 2) {
        this.scaleStep = -this.scaleStep;
      }
      this.bufferCtx.scale(this.scale, this.scale);

      this.bufferCtx.drawImage(this.filter, -this.filter.width / 2, -this.filter.height / 2);

      this.bufferCtx.restore();
      this.o += 0.01;
    },

    start: function () {
      this.captured = 0;
      this.makeSteps();
      this.parent().start();
    }
  });

  return $this;
})();

