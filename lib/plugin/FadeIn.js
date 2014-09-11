cAnimationFadeIn = (function(){

  // $this refers to the constructor.
  var $this = function (options) {
    this.defaultOptions(options, {
      color: "rgba(255, 255, 255, [[opacity]])",
      speed: -0.01,
      alpha: [1, 0],
    });
    this.parent().constructor(options);

    this.min = Math.min.apply(Math, this.alpha);
    this.max = Math.max.apply(Math, this.alpha);
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    currentAlpha: null,
    init: function() {
      this.currentAlpha = this.alpha[0];
    },

    animate: function() {
      this.bufferCtx.fillStyle = this.color.replace('[[opacity]]', this.currentAlpha / 1);
      this.bufferCtx.fillRect(0, 0, this.buffer.width, this.buffer.height);
      this.currentAlpha += this.speed;

      if (this.currentAlpha == this.alpha[1]) {
        console.log("STOPPING PLEASE!");
        this.stop();
      }
      else if (this.currentAlpha < this.min - this.speed) {
        this.currentAlpha = this.min - this.speed;
      }
      else if (this.currentAlpha > this.max - this.speed) {
        this.currentAlpha = this.max - this.speed;
      }
    }
  });

  return $this;
})();
