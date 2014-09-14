cAnimationBlinds = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      barsize: this.buffer.height / 480 * 32,
    });

    this.steps = this.buffer.height / this.barsize;

    this.y = 0;
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationBlinds',

    animate: function () {
      this.bufferCtx.fillStyle = "black";
      for (var y = 0; y < this.buffer.height; y+=this.barsize) {
        if (this.y < 32) {
          this.bufferCtx.fillRect(0, y, this.buffer.width, this.y)
        }
        else {
          this.bufferCtx.fillRect(0, y + this.y - 32, this.buffer.width, 63 - this.y)
        }
      }
      this.y++;
      if (this.y >= 64) {
        this.stop();
        this.y = 0;
      }
    }
  });

  return $this;
})();

