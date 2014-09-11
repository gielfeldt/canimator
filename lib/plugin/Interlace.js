cAnimationInterlace = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      barsize: this.canvas.height / 360,
      opacity: 0.5,
      framesPerField: 0,
    });

    this.filter = document.createElement("canvas");
    this.filterCtx = this.filter.getContext("2d");
    this.filter.width = this.buffer.width;
    this.filter.height = this.buffer.height;

    this.filterCtx.fillStyle = "rgba(0, 0, 0, " + (this.opacity * 255 / 255) + ")";
    for (var y = 0; y < this.filter.height; y += this.barsize) {
      this.filterCtx.fillRect(0, y, this.filter.width, this.barsize);
      y += this.barsize;
    }
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    field: 0,

    animate: function() {
      var y = 0;
      if (this.framesPerField) {
        this.field++;
        if (this.field > this.framesPerField) {
          if (this.field > this.framesPerField * 2) {
            this.field -= this.framesPerField * 2;
          }
          else {
            y = this.barsize;
          }
        }
      }
      this.bufferCtx.drawImage(this.filter, 0, 0, this.filter.width, this.filter.height - y, 0, y, this.buffer.width, this.buffer.height - y);
    }
  });

  return $this;
})();

