cAnimationFadeIn = (function(){
  var parent = cAnimationBase;

  // $this refers to the constructor
  var $this = function (options) {
    parent.call(this, options);
    this.color = 0;
  };

  extend(parent, $this, {
    init: function() {
      // console.log("init animation");
      this.color = 255;
    },
    animate: function() {
      color = ("0" + this.color.toString(16)).substr(-2);
      color = '#' + color + color + color;
      // this.element.style.background = color;
      this.canvasContext.fillStyle = "rgba(255, 255, 255, " + (this.color / 255) + ")";
      this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.color -= 2;
      if (this.color <= 0) {
        this.stop();
      }
    }
  });

  return $this;
})();
