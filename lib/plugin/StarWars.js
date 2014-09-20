cAnimationStarWars = (function() {

  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);

    this.defaultOptions(options, {
      text: [],
      font: {
        height: this.canvas.height / 8,
        family: "courier",
        strokeStyle: "black",
        lineWidth: 3,
        fillStyle: "yellow",
      },
    });


    this.lines = [];

    this.textBuffer = document.createElement("canvas");
    this.textBufferCtx = this.textBuffer.getContext("2d");
    this.textBuffer.width = 4000;
    this.textBuffer.height = this.font.height * 1.5 * (this.text.length + 1);

    this.setupFont();
    var maxwidth = 0;
    for (var i in this.text) {
      var width = this.textBufferCtx.measureText(this.text[i]).width;
      maxwidth = maxwidth < width ? width : maxwidth;
      this.lines[i] = {
        text: this.text[i],
        width: width,
      }
    }
    this.textBuffer.width = maxwidth;

    // Messing with the canvas width resets the context, so we need to setup
    // the font again.
    this.setupFont();

    for (var i in this.lines) {
      var line = this.lines[i];
      this.textBufferCtx.clearRect(0, this.lines.length * this.font.height * 1.5, this.textBuffer.width, this.font.height * 1.5);
      this.textBufferCtx.fillText(line.text, (maxwidth - line.width) / 2, this.lines.length * this.font.height * 1.5);
      for (var y = 0; y < this.font.height * 1.5; y++) {
        var skew = (this.font.height * 1.5 - y) * 0.7;
        // skew = 0;
        this.textBufferCtx.drawImage(this.textBuffer, 
          0, this.lines.length * this.font.height * 1.5 + y, this.textBuffer.width, 1, 
          skew, i * this.font.height * 1.5 + y, this.textBuffer.width - skew * 2, 1
        );
      }
      // this.textBufferCtx.fillText(line.text, (maxwidth - line.width) / 2, i * this.font.height * 1.5);
    }
    this.z = 1;
    this.y = 0;
    this.angle = -65;
    this.zm = 100;
    this.fov = this.buffer.height;
    this.offset = 0;
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationStatic',
    setupFont: function() {
      this.textBufferCtx.font = this.font.height + "px " + this.font.family;
      this.textBufferCtx.textBaseline = "top";
      this.textBufferCtx.strokeStyle = this.font.strokeStyle;
      this.textBufferCtx.lineWidth = this.font.lineWidth;
      this.textBufferCtx.fillStyle = this.font.fillStyle;
    },

    animate: function () {
      //this.bufferCtx.drawImage(this.textBuffer, 0, 0, this.textBuffer.width, this.textBuffer.height, 0, 0, this.buffer.width, this.buffer.height);
      //return;
      /*
      if (this.timestamp > this.duration) {
        this.stop();
        return;
      }
      */
      //this.bufferCtx.setTransform(1, 0, -1, 1, 0, 0);
      //this.bufferCtx.drawImage(this.textBuffer, 0, 0, this.textBuffer.width, this.textBuffer.height, 0, 0, this.buffer.width, this.buffer.height);
      //
      /*
      this.bufferCtx.drawImage(this.textBuffer,
        0, 0, this.textBuffer.width, this.font.height * 1.5,
        this.z, this.buffer.height-this.z, this.buffer.width - this.z * 2, this.font.height * 1.5 - this.z / 4
      );
      this.z += 0.5;
      */
     /*
      this.bufferCtx.fillStyle = "white";
      p = this.c3d(-600, 300, 4); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
      p = this.c3d( 600, 300, 4); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
      p = this.c3d(-600, 300, 1); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
      p = this.c3d( 600, 300, 1); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
     
      return;
      */
/**/

      var width = this.buffer.width / 2;
      var height = this.buffer.height;
      var x1, y1, x2, y2, w, h;

      var angle = this.angle * Math.PI / 180;

      var step = this.font.height * 1.5 / 128;
      var odd = 0;
      var idx = 0;
      var textOffset = (height * 2) / (this.font.height * 1.5 / 2);
      // console.log(textOffset);
      for (var y = 0; y < height * 2; y += this.font.height * 1.5 / 2) {
        var offset = this.offset % (this.font.height * 1.5 / 2);
        idx = Math.floor((this.offset + y) / (this.font.height * 1.5 / 2));
        var left = new point(-width / 2, y - height - offset, this.zm, 0, 0, this.zm, this.fov);
        //console.log(left);
        var right = new point(width / 2, y - height - offset + this.font.height * 1.5, this.zm, 0, 0, this.zm, this.fov);
        //console.log(right);
        left.rotateX(angle);
        right.rotateX(angle);        
        x1 = this.getX(left);
        y1 = this.getY(left);
        x2 = this.getX(right);
        // x2 = this.buffer.width - x1;
        y2 = this.getY(right);
        w = x2 - x1;
        h = y2 - y1;
        //console.log(y + ": " + x1 + ", " + y1 + ", " + x2 + ", " + y2 + "  [" + w + " x " + h + "]");
        /*
        this.bufferCtx.fillStyle = idx % 2 ? "white" : "red";
        this.bufferCtx.fillRect(x1, y1, w, h);
        this.bufferCtx.fillStyle = "black";
        this.bufferCtx.textBaseline = "top";
        this.bufferCtx.fillText("#" + idx + " - " + offset, x1, y1);
        /**/
        // console.log(y);
        idx -= textOffset;
        if (idx >= 0 && idx < this.lines.length) {
          this.bufferCtx.fillStyle = "green";
          this.bufferCtx.fillRect(0, 0, 10, 10);
          // this.bufferCtx.fillText(this.lines[idx].text, x1 + 100, y1);
          this.bufferCtx.drawImage(this.textBuffer, 
            0, idx * this.font.height * 1.5, this.textBuffer.width, this.font.height * 1.5,
            x1, y1, w, h / 2
          );
        }
        else {
          this.bufferCtx.fillStyle = "red";
          this.bufferCtx.fillRect(0, 0, 10, 10);
        }
      }
      this.offset += step;
      if (this.offset > this.font.height * 1.5) {
        // this.offset -= this.font.height * 1.5;
      }

      var gradient = this.textBufferCtx.createLinearGradient(0,0,0,this.buffer.height / 2);
      gradient.addColorStop("0","rgba(0, 0, 0, 1)");
      gradient.addColorStop("0.7","rgba(0, 0, 0, 1)");
      gradient.addColorStop("1","rgba(0, 0, 0, 0)");
      this.bufferCtx.fillStyle = gradient;
      this.bufferCtx.fillRect(0,this.buffer.height / 2 * 0.3,this.buffer.width,this.buffer.height / 2);
      // this.angle -= 0.1;
      // console.log(this.angle);
      return;

      var p = [];

      p[0] = new point(-40, -40, this.zm, 0, 0, this.zm, this.fov);
      p[1] = new point( 40, -40, this.zm, 0, 0, this.zm, this.fov);
      p[2] = new point( 40,  40, this.zm, 0, 0, this.zm, this.fov);
      p[3] = new point(-40,  40, this.zm, 0, 0, this.zm, this.fov);
      this.fov += 0.1;
      // this.zm += 1;

      this.bufferCtx.fillStyle = "white";

      var x = [];
      var y = [];
      for (var i in p) {
        p[i].rotateX(this.angle);
        p[i].rotateY(this.angle);
        // p[i].rotateXYZ(this.angle, this.angle, this.angle);
        x[i] = p[i].getX() + (this.buffer.width / 2);
        y[i] = p[i].getY() + (this.buffer.height / 2);
        // p[i].rotateY(this.angle);
        // this.bufferCtx.fillRect((this.buffer.width / 2) + p[i].getX(), (this.buffer.height / 2) + p[i].getY(), 2, 2);
      }

      for (var i in p) {
        this.bufferCtx.fillRect(x[i], y[i], 1, 1);
      }
      /**/
      this.bufferCtx.lineWidth = 1;
      this.bufferCtx.lineColor = "white";
      this.bufferCtx.strokeStyle = "white";
      this.bufferCtx.beginPath();
      this.bufferCtx.moveTo(x[0], y[0]);
      this.bufferCtx.lineTo(x[1], y[1]);
      this.bufferCtx.lineTo(x[2], y[2]);
      this.bufferCtx.lineTo(x[3], y[3]);
      this.bufferCtx.lineTo(x[0], y[0]);
      this.bufferCtx.stroke();
      /**/
      this.angle += 0.01;
      // this.angle = -45 * Math.PI / 180;
      return;


      var p;
      /*
      this.z = 2;
      this.bufferCtx.fillStyle = "white";
      p = this.c3d(-600, -400, this.z); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
      this.bufferCtx.fillStyle = "red";
      p = this.c3d( 600, -400, this.z); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
      this.bufferCtx.fillStyle = "green";
      p = this.c3d( 600,  400, this.z); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
      this.bufferCtx.fillStyle = "blue";
      p = this.c3d(-600,  400, this.z); this.bufferCtx.fillRect(p[0], p[1], 10, 10);
      /**/
/**/
//      for (this.z = 1; this.z <= 2; this.z+=1) {
        this.bufferCtx.fillStyle = "white";
        var p1 = this.c3d(-600, 300, this.z);
        this.bufferCtx.fillStyle = "red";
        var p2 = this.c3d( 600, 300, this.z);
        this.bufferCtx.fillStyle = "green";
        var p3 = this.c3d(-600, 300, this.z+0.2);
        this.bufferCtx.fillStyle = "blue";
        var p4 = this.c3d( 600, 300, this.z+0.2);

        this.bufferCtx.drawImage(this.textBuffer,
          0, 0, this.textBuffer.width, this.font.height * 1.5,
          p1[0], p3[1] + this.y, this.buffer.width - p1[0] * 2, p1[1] - p3[1]
          // p3[0], p3[1], p4[0], p2[0]
        )
  //    }
      this.z += 0.0015;
      this.y -= 0.3;
      /**/
    },
    c3d: function (x, y, z) {
      return [(x / z) + (this.buffer.width / 2), (y / z) + (this.buffer.height / 2)];
    },
    getX: function(point) {
      return point.getX() + this.buffer.width / 2;
    },
    getY: function(point) {
      return point.getY() + this.buffer.height / 2;
    }

  });

  return $this;
})();

point = (function() {
  // $this refers to the constructor.
  var $this = function (x, y, z, cx, cy, cz, fov) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.cx = cx;
    this.cy = cy;
    this.cz = cz;
    this.fov = fov;
  }

  EasyOOP.extend(null, $this, {
    rotateX: function (angle) {
      var y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
      var z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
      this.y = y + this.cy;
      this.z = z + this.cz;
    },
    rotateY: function (angle) {
      var z = this.z * Math.cos(angle) - this.x * Math.sin(angle);
      var x = this.z * Math.sin(angle) + this.x * Math.cos(angle);
      this.z = z + this.cz;
      this.x = x + this.cx;
    },
    rotateZ: function (angle) {
      var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
      var y = this.x * Math.sin(angle) - this.y * Math.cos(angle);
      this.x = x + this.cx;
      this.y = y + this.cy;
    },
    rotateXYZ: function (ax, ay, az) {
      this.rotateX(ax);
      this.rotateY(ay);
      this.rotateZ(az);
    },

    getX: function () {
      // return this.x / this.z;
      var scale = this.fov / (this.z + this.fov);
      return this.x * scale;
    },

    getY: function () {
      // return this.y / this.z;
      var scale = this.fov / (this.z + this.fov);
      return this.y * scale;
    }
  });

  return $this;
})();
