cAnimationRasterBorder = (function() {
  var parent = cAnimationBase;

  // $this refers to the constructor
  var $this = function (options) {    
    // console.log(options);
    this.canvas = null;
    this.clut = [];
    this.margin = 32;
    this.barsize = 1;
    this.steps = 32;

    parent.call(this, options);

    this.horizontal = document.createElement("canvas");
    this.horizontalContext = this.horizontal.getContext("2d");
    this.horizontal.width = this.canvas.width;
    this.horizontal.height = this.margin * 2;

    this.vertical = document.createElement("canvas");
    this.verticalContext = this.vertical.getContext("2d");
    this.vertical.width = this.margin;
    this.vertical.height = this.canvas.height * 2;

    var frequency = Math.PI * 2 / this.steps;
    for (var i = 0; i < Math.PI * 2; i = i + frequency) {
       red   = Math.sin(i + 0) * 127 + 128;
       green = Math.sin(i + 2 * Math.PI * 2 / 3) * 127 + 128;
       blue  = Math.sin(i + 4 * Math.PI * 2 / 3) * 127 + 128;

       // document.write( '<font color="' + RGB2Color(red,green,blue) + '">&#9608;</font>');
       // this.clut.push(RGB2Color(red,green,blue));
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

  extend(parent, $this, {
    animate: function() {
      var y;
      y = Math.floor((Math.random() * this.margin));
      this.canvasContext.drawImage(this.horizontal, 0, y, this.canvas.width, this.margin, 0, 0, this.canvas.width, this.margin);
      y = Math.floor((Math.random() * this.margin));
      this.canvasContext.drawImage(this.horizontal, 0, y, this.canvas.width, this.margin, 0, this.canvas.height - this.margin, this.canvas.width, this.margin);
      y = Math.floor((Math.random() * this.canvas.height));
      var height = this.canvas.height - (this.margin * 2);
      this.canvasContext.drawImage(this.vertical, 0, y, this.margin, height, 0, this.margin, this.margin, height);
      this.canvasContext.drawImage(this.vertical, 0, y, this.margin, height, this.canvas.width - this.margin, this.margin, this.margin, height);
      // this.canvasContext.drawImage(this.horizontal, 0, hy, this.canvas.width, this.margin, 0, 0, this.canvas.width, this.margin);
      // this.canvasContext.drawImage(this.canvas, 0, 0, this.canvas.width, this.margin, 0, this.canvas.height - this.margin, this.canvas.width, this.margin);
      // this.canvasContext.drawImage(this.canvas, 0, this.margin, this.margin, (this.canvas.height - this.margin * 2), this.canvas.width - this.margin, this.margin, this.margin, (this.canvas.height - this.margin * 2));
    }
  });

  return $this;
})();
