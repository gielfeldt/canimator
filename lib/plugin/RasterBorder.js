cAnimationRasterBorder = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      margin: Math.round(this.canvas.height / 15),
      barsize: this.canvas.height / 360,
      steps: 32,
    });

    this.horizontal = document.createElement("canvas");
    this.horizontalContext = this.horizontal.getContext("2d");
    this.horizontal.width = this.buffer.width;
    this.horizontal.height = this.margin * 2;

    this.vertical = document.createElement("canvas");
    this.verticalContext = this.vertical.getContext("2d");
    this.vertical.width = this.margin;
    this.vertical.height = this.buffer.height * 2;

    var frequency = Math.PI * 2 / this.steps;
    for (var i = 0; i < Math.PI * 2; i = i + frequency) {
       red   = Math.sin(i + 0) * 127 + 128;
       green = Math.sin(i + 2 * Math.PI * 2 / 3) * 127 + 128;
       blue  = Math.sin(i + 4 * Math.PI * 2 / 3) * 127 + 128;
       this.clut.push("rgb(" + parseInt(red) + ", " + parseInt(green) + ", " + parseInt(blue) + ")");
    }
    for (i = 0; i < this.horizontal.height; i += this.barsize) {
      color = Math.floor((Math.random() * this.steps));
      this.horizontalContext.fillStyle = this.clut[color];
      this.horizontalContext.fillRect(0, i, this.horizontal.width, this.barsize);
    }
    for (i = 0; i < this.vertical.height; i += this.barsize) {
      color = Math.floor((Math.random()*this.steps));
      this.verticalContext.fillStyle = this.clut[color];
      this.verticalContext.fillRect(0, i, this.margin, this.barsize);
    }

  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationRasterBorder',
    clut: [],
    animate: function() {
      var y;
      y = Math.floor((Math.random() * this.margin));
      this.bufferCtx.drawImage(this.horizontal, 0, y, this.buffer.width, this.margin, 0, 0, this.buffer.width, this.margin);
      y = Math.floor((Math.random() * this.margin));
      this.bufferCtx.drawImage(this.horizontal, 0, y, this.buffer.width, this.margin, 0, this.buffer.height - this.margin, this.buffer.width, this.margin);
      y = Math.floor((Math.random() * this.buffer.height));
      var height = this.buffer.height - (this.margin * 2);
      this.bufferCtx.drawImage(this.vertical, 0, y, this.margin, height, 0, this.margin, this.margin, height);
      this.bufferCtx.drawImage(this.vertical, 0, y, this.margin, height, this.buffer.width - this.margin, this.margin, this.margin, height);
      // this.bufferCtx.drawImage(this.horizontal, 0, hy, this.buffer.width, this.margin, 0, 0, this.buffer.width, this.margin);
      // this.bufferCtx.drawImage(this.buffer, 0, 0, this.buffer.width, this.margin, 0, this.buffer.height - this.margin, this.buffer.width, this.margin);
      // this.bufferCtx.drawImage(this.buffer, 0, this.margin, this.margin, (this.buffer.height - this.margin * 2), this.buffer.width - this.margin, this.margin, this.margin, (this.buffer.height - this.margin * 2));
    }
  });

  return $this;
})();
