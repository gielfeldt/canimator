cAnimationSkewArtifacts = (function() {

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
    name: 'cAnimationSkewArtifacts',

    makeSteps: function() {
      var y = 0;
      this.steps = [];
      do {
        var h = Math.ceil(Math.random() * 2);
        // h = 32;
        this.steps.push([y, h]);
        y += h;
      } while (y < this.buffer.height);
      this.o = 0;
    },

    animate: function() {
      this.filterCtx.clearRect(0, 0, this.filter.width, this.filter.height);
      this.filterCtx.drawImage(this.buffer, 0, 0);

      this.bufferCtx.save();
      this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
      // this.bufferCtx.translate(this.buffer.width / 2, this.buffer.height / 2);
      var s = Math.random() * 4;
      // this.bufferCtx.setTransform(1, 0, s, 1, 0, 0);
      for (var i = 0; i < this.steps.length; i += 2) {
        var y = this.steps[i][0];
        var h = this.steps[i][1];
        // this.bufferCtx.drawImage(this.filter, 0, 0);
        this.bufferCtx.drawImage(this.filter, 
          0, y, this.filter.width, h,
          // -y * s, y, this.buffer.width, h
          -s, y, this.buffer.width, h
        );
        //console.log(y + ' x ' + h)
      }
      //this.bufferCtx.setTransform(1, 0, -s, 1, 0, 0);
      for (var i = 1; i < this.steps.length; i += 2) {
        var y = this.steps[i][0];
        var h = this.steps[i][1];
        // this.bufferCtx.drawImage(this.filter, 0, 0);
        this.bufferCtx.drawImage(this.filter, 
          0, y, this.filter.width, h,
          // y * s + this.steps[i - 1][1] * s, y, this.buffer.width, h
          s, y, this.buffer.width, h
        );
        //console.log(y + ' x ' + h)
      }
      this.bufferCtx.restore();
      this.o -= 0.01;
    },

    start: function () {
      this.captured = 0;
      this.makeSteps();
      this.parent().start();
    }
  });

  return $this;
})();

