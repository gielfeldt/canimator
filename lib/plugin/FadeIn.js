cAnimationFadeIn = (function(){

  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);

    this.defaultProperties({
      currentAlpha: null,
    });
    this.defaultOptions(options, {
      color: "rgba(255, 255, 255, [[opacity]])",
      alpha: [1, 0],
      duration: 2000,
    });

    this.min = Math.min.apply(Math, this.alpha);
    this.max = Math.max.apply(Math, this.alpha);
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationFadeIn',
    init: function() {
      this.currentAlpha = this.alpha[0];
    },

    animate: function() {
      var finished = false;
      this.currentAlpha = this.timestamp / this.duration;
      if (this.currentAlpha > 1) {
        this.currentAlpha = 1;
        finished = true;
      }
      this.currentAlpha *= this.max - this.min;
      this.currentAlpha =this.min == this.alpha[0] ? this.currentAlpha + this.min : this.max - this.currentAlpha;

      this.bufferCtx.fillStyle = this.color.replace('[[opacity]]', this.currentAlpha / 1);
      this.bufferCtx.fillRect(0, 0, this.buffer.width, this.buffer.height);

      if (finished) {
        console.log("STOPPING PLEASE!");
        this.stop();
        return;
      }
    }
  });

  return $this;
})();
