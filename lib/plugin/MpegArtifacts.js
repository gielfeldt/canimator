cAnimationMpegArtifacts = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      blocksize: this.canvas.height / 24,
    });

    this.filter = document.createElement("canvas");
    this.filterCtx = this.filter.getContext("2d");
    this.filter.width = this.buffer.width;
    this.filter.height = this.buffer.height;
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationMpegArtifacts',
    field: 0,
    blocks: [],

    makeBlocks: function() {
      for (var i = 0; i < 100; i++) {
        var x = Math.floor(Math.random() * this.buffer.width / this.blocksize) * this.blocksize;
        var y = Math.floor(Math.random() * this.buffer.width / this.blocksize) * this.blocksize;
        var w = Math.ceil(Math.random() * 8) * this.blocksize;
        var h = Math.ceil(Math.random() * 2) * this.blocksize;
        this.blocks[i] = [x, y, w, h];
      }
    },
    animate: function() {
      if (this.timestamp > this.captured + 100) {
        this.makeBlocks();
        this.captured = this.timestamp;
        this.filterCtx.clearRect(0, 0, this.filter.width, this.filter.height);
        this.filterCtx.drawImage(this.buffer, 0, 0);
        return;
      }

      for (var i = 0; i < this.blocks.length; i++) {
        /*
        var x = Math.floor(Math.random() * this.buffer.width / this.blocksize) * this.blocksize;
        var y = Math.floor(Math.random() * this.buffer.width / this.blocksize) * this.blocksize;
        var w = Math.floor(Math.random() * 4) * this.blocksize;
        var h = this.blocksize;
        this.bufferCtx.clearRect(x, y, w, h);
        this.bufferCtx.drawImage(this.filter,
          x, y, w, h,
          x, y, w, h
        );
        */
        var x = this.blocks[i][0];
        var y = this.blocks[i][1];
        var w = this.blocks[i][2];
        var h = this.blocks[i][3];
        this.bufferCtx.clearRect(x, y, w, h);
        this.bufferCtx.drawImage(this.filter,
          x, y, w, h,
          x, y, w, h
        );
      }
      /*
      this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height / 2);
      this.bufferCtx.drawImage(this.filter,
        0, 0, this.filter.width, this.filter.height / 2,
        0, 0, this.buffer.width, this.buffer.height / 2
      );
      */
    },

    start: function () {
      this.captured = 0;
      this.makeBlocks();
      this.parent().start();
    }
  });

  return $this;
})();

