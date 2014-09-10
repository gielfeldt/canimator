cAnimationTest1 = (function() {
  var parent = cAnimationBase;

  // $this refers to the constructor
  var $this = function (options) {
    this.offset = 100;
    this.step = 1;
    this.margin = 64;
    this.x = 0;
    parent.call(this, options);
    this.scrollWidth = 640 - 128;

    ctx = this.canvasContext;
    ctx.font = 64 + "px verdana";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#FF0000';
    ctx.textAlign = "middle";

  };

  extend(parent, $this, {
    animate: function() {
      ctx = this.canvasContext;
      var y = this.canvas.height / 2;

      ctx.save();
      ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
      ctx.rotate(this.x);
      this.x += 1;
      ctx.fillText("a", -ctx.measureText("a").width / 2, 0);
      ctx.restore();
      /*
      for (var x = 0; x < this.scrollWidth; x++) {
        var yo = y + Math.sin(((x) / this.scrollWidth) * Math.PI * 2) * 80;
        this.canvasContext.fillRect(this.margin + x, yo, 4, 4);
      }
      */
      return;


      var gradient = ctx.createLinearGradient(0,0,200,0);
      var color = "black";
      for (var i = 0; i <= 1; i += 0.1) {
        gradient.addColorStop(i, color);
        color = color == "black" ? "white" : "black";
      }
/*      
      var gradient = ctx.createLinearGradient(0,0,100,0);
      gradient.addColorStop("0", "black");
      gradient.addColorStop("0.1", "white");
      gradient.addColorStop("0.2", "black");
      gradient.addColorStop("0.3", "white");
      gradient.addColorStop("0.4", "black");
      gradient.addColorStop("0.5", "white");
      gradient.addColorStop("0.6", "black");
      gradient.addColorStop("0.7", "white");
      gradient.addColorStop("0.8", "black");
      gradient.addColorStop("0.9", "white");
      gradient.addColorStop("1", "black");
*/
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 200, 100);

      var gradient = ctx.createLinearGradient(0,100,0,200);
      // var gradient = ctx.createRadialGradient(50,50,0,50,50,100);
      this.offset += this.step;
      if (this.offset < 0 || this.offset > 100) {
        this.step = -this.step;
        this.offset += this.step;
      }
      var color = "black";
      for (var i = 0; i <= 1; i += 0.1) {
        gradient.addColorStop(i, color);
        color = color == "black" ? "white" : "black";
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 100, 100, 100);

      ctx.drawImage(this.canvas, this.offset, 0, 100, 100, 200, 0, 100, 100);
      ctx.globalCompositeOperation = "ligher";
      ctx.drawImage(this.canvas, 0, 100, 100, 100, 200, 0, 100, 100);

      /*
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(20,20);
      ctx.bezierCurveTo(20,100,200,100,100,20);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.setLineDash([2]);  //pattern, can be more than 2 entries
      ctx.lineDashOffset = this.offset;
      this.offset = (this.offset + 1) % 4;
      ctx.stroke();
      */
    }
  });

  return $this;
})();



cAnimationTest2 = (function() {
  var parent = cAnimationBase;

  // $this refers to the constructor
  var $this = function (options) {
    this.buffer = document.createElement("canvas");
    this.bufferContext = this.buffer.getContext("2d");
    this.buffer.width = 4000;
    this.buffer.height = 128;
    this.margin = 32;
    this.text = "";
    this.speed = -2;

    parent.call(this, options);

    this.speed = -this.speed;

    this.fontHeight = 64;
    this.bufferContext.font = this.fontHeight + "px verdana";
    this.bufferContext.textBaseline = "top";
    this.bufferContext.strokeStyle = 'black';
    this.bufferContext.lineWidth = 3;
    this.bufferContext.fillStyle = '#FF0000';
    this.textWidth = this.bufferContext.measureText(this.text).width;
    this.scrollWidth = this.canvas.width - (this.margin * 2);

    this.x = this.speed > 0 ? 0 : this.textWidth + this.canvas.width;

    //this.x = this.canvas.width / 2;
    //this.x = 0;

    // Create gradient
    var gradient = this.bufferContext.createLinearGradient(0,0,this.textWidth,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    this.bufferContext.fillStyle = gradient;
    this.bufferContext.fillText(this.text, this.scrollWidth, 0);
    this.cnt = 0;
    this.amplitude = 100;
    this.frame = 0;
    this.ampLUT = [];
    this.sineLUT = [];
    for (var i = 0; i < 720; i++) {
      this.sineLUT[i] = Math.sin(i / 720 * Math.PI * 2);
    }
    this.sine = function(x, max) {
      // var amp = Math.sin(((this.frame * 2) % max) / max * Math.PI * 2) * 80;
      // return Math.sin(x % max / max * Math.PI * 2) * amp;
      // return this.sineLUT[(x % max) / max * 720] * this.sineLUT[((this.frame * 2) % max) / max * 720];
      // console.log(x % max / max * 720);
      // return this.sineLUT[x % max / max] * 80;
      // console.log("frame:" + this.frame);
      var i = Math.round(x % max / max * 720);
      // var i2 = Math.round(this.frame * 2.5 % max / max * 720);
      return this.sineLUT[i] * 80; // this.sineLUT[i2] * 80;
      // console.log("lut:" + this.sineLUT[x % max / max * 720]);
      // console.log("sin:" + Math.sin(x % max / max * Math.PI * 2));
      return Math.sin(x % max / max * Math.PI * 2) * 80;
    }
    // console.log(this.sine);
  };

  extend(parent, $this, {
    init: function() {
    },
    animate: function() {
      this.frame++;
      this.canvasContext.setTransform(1,  0,0,1,0,0);
      this.canvasContext.drawImage(this.buffer, this.scrollWidth, 0, 40, this.fontHeight * 1.5, 0, 0, 40, this.fontHeight * 1.5);
      this.canvasContext.setTransform(1,0.5,0,1,0,-this.fontHeight * Math.sin(0.5));
      this.canvasContext.drawImage(this.buffer, this.scrollWidth, 0, 40, this.fontHeight * 1.5, 40, 0, 40, this.fontHeight * 1.5);
      this.canvasContext.setTransform(1,  1,0,1,0,-this.fontHeight * Math.sin(1));
      this.canvasContext.drawImage(this.buffer, this.scrollWidth, 0, 40, this.fontHeight * 1.5, 80, 0, 40, this.fontHeight * 1.5);

      return;
/*
      this.canvasContext.setTransform(1,0,0,1,0,0);
      this.canvasContext.drawImage(this.buffer,  0, 0, 16, this.fontHeight * 1.5, this.margin +  0, this.margin +  0, 16, this.fontHeight * 1.5);
      this.canvasContext.drawImage(this.buffer, 16, 0, 16, this.fontHeight * 1.5, this.margin + 16, this.margin +  1, 16, this.fontHeight * 1.5);
      this.canvasContext.drawImage(this.buffer, 32, 0, 16, this.fontHeight * 1.5, this.margin + 32, this.margin +  2, 16, this.fontHeight * 1.5);
      this.canvasContext.drawImage(this.buffer, 48, 0, 16, this.fontHeight * 1.5, this.margin + 48, this.margin +  3, 16, this.fontHeight * 1.5);
      this.x += Math.PI / 1000;
      return;
*/
      // var center = this.canvas.height / 2;
      var center = (this.canvas.height - this.fontHeight * 1.5) / 2;
      var s = 8;

      // this.canvasContext.fillStyle = "red";
      for (var x = 0; x < this.scrollWidth; x += s) {
        var y = this.sine(this.scrollWidth + this.x - x, this.scrollWidth);
        // this.canvasContext.fillRect(this.margin + x, center + y, s, s);
        // var yo = this.amplitude - (this.fontHeight / 1.5) + Math.sin(((this.x - x) / this.canvas.width) * Math.PI * 2 * 2) * this.amplitude;
//         var yon = this.amplitude - (this.fontHeight / 1.5) + Math.sin(((this.x - (x + s)) / this.canvas.width) * Math.PI * 2 * 2) * this.amplitude;
        // this.canvasContext.setTransform(1,Math.sin(((this.x - x) / this.canvas.width)),0,1,0,0);
        // console.log(Math.sin(x / this.scrollWidth * Math.PI));
        // this.canvasContext.drawImage(this.buffer, x, 0, s, this.fontHeight * 1.5, this.margin + x, y + yo + comp, s, this.fontHeight * 1.5);
        // 
        // this.canvasContext.setTransform(1,0.01,0,1,0,0);
        this.canvasContext.drawImage(this.buffer, this.x + x, 0, s, this.fontHeight * 1.5, this.margin + x, center + y, s, this.fontHeight * 1.5);
      }
      this.canvasContext.setTransform(1,0,0,1,0,0);
      //this.stop();
      this.x += this.speed;
      if (this.x > this.textWidth + this.canvas.width) {
        this.x = 0;
      }
      else if (this.x < 0) {
        this.x = this.textWidth + this.canvas.width;
      }
    }
  });

  return $this;
})();
