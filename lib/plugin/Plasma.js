cAnimationPlasma = (function() {

  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);
    this.defaultOptions(options, {
      //margin: Math.round(this.canvas.height / 15),
      margin: 0,
    });


    var colors = [[
      "magenta",
      "blue",
      "black",
      "green",
      "yellow",
      "green",
      "black",
      "red",
    ]];
    colors[0] = ["black", "white"]
    colors[1] = ["white", "black"]
    colors[2] = ["black", "white"]
    //colors[1] = ["yellow", "blue"]

/*
    colors[0] = ["red", "green"]
    colors[1] = ["yellow", "blue"]
    colors[2] = ["magenta", "red"]
/**/
    var bands = [2,2,16];
    this.buffers = [];
    this.contexts = [];
    this.buffers[0] = document.createElement('canvas');
    this.buffers[0].width = this.buffer.width * 2;
    this.buffers[0].height = this.buffer.height;
    this.contexts[0] = this.buffers[0].getContext("2d");

    gradient = this.contexts[0].createLinearGradient(0, 0, this.buffer.width * 2, 0);
    var mx = colors[0].length * 2 * bands[0];
    for (var i = 0; i < mx; i++) {
      gradient.addColorStop(i / mx, colors[0][i%colors[0].length]);
    }
    this.contexts[0].fillStyle = gradient;
    this.contexts[0].fillRect(0, 0, this.buffer.width * 2, this.buffer.height);

    this.buffers[1] = document.createElement('canvas');
    this.buffers[1].width = this.buffer.width;
    this.buffers[1].height = this.buffer.height * 2;
    this.contexts[1] = this.buffers[1].getContext("2d");
    gradient = this.contexts[1].createLinearGradient(0, 0, 0, this.buffer.height * 2);
    var mx = colors[1].length * 2 * bands[1];
    for (var i = 0; i < mx; i++) {
      gradient.addColorStop(i / mx, colors[1][i%colors[1].length]);
    }
    this.contexts[1].fillStyle = gradient;
    this.contexts[1].fillRect(0, 0, this.buffer.width, this.buffer.height * 2);

    this.buffers[2] = document.createElement('canvas');
    this.buffers[2].width = this.buffer.width;
    this.buffers[2].height = this.buffer.height;
    this.contexts[2] = this.buffers[2].getContext("2d");
    gradient = this.contexts[2].createRadialGradient(
      this.buffer.width / 2, this.buffer.height / 2, 0,
      this.buffer.width / 2, this.buffer.height / 2, this.buffer.width * 2
    );
    for (var i = 0; i < colors[2].length * bands[2] + 1; i++) {
      gradient.addColorStop(i / colors[2].length / bands[2], colors[2][i%colors[2].length]);
    }
    this.contexts[2].fillStyle = gradient;
    this.contexts[2].fillRect(0, 0, this.buffer.width, this.buffer.height);

    this.x = 0;
    this.y = 0;
    this.scale = 2;
    this.scaleStep = 0.01;
    this.o = 0;

    var downsize = 4;
    this.scaled = document.createElement('canvas');
    this.scaled.width = this.buffer.width / downsize;
    this.scaled.height = this.buffer.height / downsize;
    this.scaledCtx = this.scaled.getContext("2d");
    this.scaledImg = this.scaledCtx.getImageData(0, 0, this.scaled.width, this.scaled.height)
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationPlasma',

    animate: function() {
      for (var y = 0; y < this.scaled.height; y++) {
        for (var x = 0; x < this.scaled.width; x++) {
          var x1 = x / this.scaled.width - 0.5;
          var y1 = y / this.scaled.height - 0.5;
          var pos = y * this.scaled.width * 4 + x * 4;
          /**/
          var v = 0;
          /*
          v = (
              128.0 + (128.0 * Math.sin(x1 / 16.0))
            + 128.0 + (128.0 * Math.sin(y1 / 8.0))
            + 128.0 + (128.0 * Math.sin((x1 + y1) / 16.0))
            + 128.0 + (128.0 * Math.sin(Math.sqrt(2*(x1 * x1 + y1 * y1)) / 8.0))
          ) / 4;
          */
          v = (Math.sin(x1 * 10 + this.o) + 1) * 127;

          //v = Math.sin(x1 * 10 + this.o)
          //v += Math.sin(10 * (x1 * Math.sin(this.o / 2) + y1 / 10 * Math.cos(this.o / 3)) + this.o);
          //var cx = x1 + 0.5 * Math.sin(this.o / 5);
          //var cy = y1 + 0.5 * Math.cos(this.o / 3);
          //v += Math.sin(Math.sqrt(100 * (cx * cx + cy * cy) + 1 + this.o))

/*
          var c = Math.round((v + 1) * 127);
          if (c < 0) c = 0;
          if (c > 255) c = 255;
*/
          
          //img.data[pos] = Math.round((Math.sin(v * Math.PI) + 1) * 127);
          //img.data[pos + 1] = Math.round((Math.cos(v * Math.PI) + 1) * 127);
          var r, g, b
/*
          r = Math.round((Math.sin(v * Math.PI) + 1) * 127);
          g = Math.round((Math.cos(v * Math.PI) + 1) * 127);
          b = 0;
/**/
          r=g=b=v;
          //r=x;g=y;b=0;
          //r = g = b = Math.round((Math.sin(v * 5 * Math.PI) + 1) * 127);
          this.scaledImg.data[pos] = r;
          this.scaledImg.data[pos + 1] = g;
          this.scaledImg.data[pos + 2] = b;
          this.scaledImg.data[pos + 3] = 255;

        }
      }
      this.o += 0.01;
      this.scaledCtx.putImageData(this.scaledImg, 0, 0)
      this.bufferCtx.drawImage(this.scaled,
        0, 0, this.scaled.width, this.scaled.height,
        0, 0, this.buffer.width, this.buffer.height
      )

      return;
      /*
      var img = this.bufferCtx.getImageData(0, 0, this.buffer.width, this.buffer.height)
      var s = 4;
      for (var y = 0; y < this.buffer.height; y+=s) {
        for (var x = 0; x < this.buffer.width; x+=s) {
          var x1 = x / this.buffer.width - 0.5;
          var y1 = y / this.buffer.height - 0.5;
          var pos = y * this.buffer.width * 4 + x * 4;
          var v = 0;
          v = Math.sin(x1 * 10 + this.o)
          v += Math.sin(10 * (x1 * Math.sin(this.o / 2) + y1 / 10 * Math.cos(this.o / 3)) + this.o);
          var cx = x1 + 0.5 * Math.sin(this.o / 5);
          var cy = y1 + 0.5 * Math.cos(this.o / 3);
          v += Math.sin(Math.sqrt(100 * (cx * cx + cy * cy) + 1 + this.o))

          var c = Math.round((v + 1) * 127);
          if (c < 0) c = 0;
          if (c > 255) c = 255;

          
          //img.data[pos] = Math.round((Math.sin(v * Math.PI) + 1) * 127);
          //img.data[pos + 1] = Math.round((Math.cos(v * Math.PI) + 1) * 127);
          var r, g, b

          r = Math.round((Math.sin(v * Math.PI) + 1) * 127);
          g = Math.round((Math.cos(v * Math.PI) + 1) * 127);
          b = 0;

          //r = g = b = Math.round((Math.sin(v * 5 * Math.PI) + 1) * 127);
          for (u = 0; u < s * s; u++) {
            var p = pos + (u % s) * 4 + Math.floor(u / s) * this.buffer.width * 4;
            img.data[p] = r;
            img.data[p + 1] = g;
            img.data[p + 2] = b;
            img.data[p + 3] = 255;
            //break;
          }
          //this.bufferCtx.fillStyle = "rgb(" + c + "," + c + "," + c + ");"
          //this.bufferCtx.fillRect(x, y, s, s);

        }
      }
      this.o += 0.1;
      this.bufferCtx.putImageData(img, 0, 0)

      return;
      /**/
      this.bufferCtx.save();
      this.bufferCtx.globalAlpha = 1;
      // Vertical
/**/
      this.bufferCtx.drawImage(this.buffers[0], 
        this.x, 0, this.buffer.width, this.buffer.height,
        this.margin, this.margin, this.buffer.width - this.margin * 2, this.buffer.height - this.margin * 2
      )
      //this.x = (1 + Math.sin(this.o)) * 100;
      /**/
      this.x+=1;
      while (this.x > this.buffer.width) this.x -= this.buffer.width;
/*
      this.bufferCtx.drawImage(this.buffers[1], 
        0, this.x, this.buffer.width, this.buffer.height,
        this.margin, this.margin, this.buffer.width - this.margin * 2, this.buffer.height - this.margin * 2
      )
/**/
      // Rotozoom
      this.bufferCtx.globalCompositeOperation = "exclusion";
/**/
      this.scale += this.scaleStep;
      if (this.scale < 1 || this.scale > 4) {
        this.scaleStep = -this.scaleStep;
      }
      this.scale = 2 + ((1 + Math.cos(this.o * 2)) * 2);
      //this.bufferCtx.setTransform(this.scale, Math.cos(this.o/4)*4, Math.sin(this.o/4)*4, this.scale, this.buffer.width / 2, this.buffer.height / 2);

      this.bufferCtx.translate(this.buffer.width / 2, this.buffer.height / 2);
      this.bufferCtx.rotate(Math.sin(this.o/4)*4);
      this.bufferCtx.scale(this.scale, this.scale);

      this.bufferCtx.drawImage(this.buffers[1], -this.buffer.width / 2, -this.buffer.height / 2);
/*
      this.bufferCtx.drawImage(this.buffers[1],
        this.margin, this.margin, this.buffers[1].width - this.margin * 2, this.buffers[1].height,
        -this.buffer.width / 2 + this.margin, -this.buffer.height / 2 + this.margin,
        this.buffer.width - this.margin * 2, this.buffer.height - this.margin * 2
      );
/*
      // Radiant
      this.bufferCtx.setTransform(1, 0, 0, 1, 0, 0)
      this.bufferCtx.globalCompositeOperation = "overlay";
      this.bufferCtx.drawImage(this.buffers[2], Math.cos(this.o) * 10, Math.sin(this.o) * 10);
      /*

      //this.bufferCtx.drawImage(this.buffers[2], 0, 0);
      // this.bufferCtx.drawImage(this.buffers[2], 0, 0, 512, 512, 0, 0, 512, 512);
      this.bufferCtx.drawImage(this.buffers[2], 
        256-this.o, 256-this.o, 256, 256,
        0, 0, 256, 256
      );

      this.bufferCtx.setTransform(-1, 0, 0, 1, 512, 0)
      this.bufferCtx.drawImage(this.buffers[2], 
        256-this.o, 256-this.o, 256, 256,
        0, 0, 256, 256
      );
      
      //this.bufferCtx.setTransform(-1, 0, 0, 1, 512, 0)
      //this.bufferCtx.drawImage(this.buffers[2], 256-this.o, 256-this.o, 256, 256, 0, 0, 256, 256);
      /*
      this.bufferCtx.setTransform(1, 0, 0, -1, 0, this.buffer.height / 2)
      this.bufferCtx.drawImage(this.buffers[2],
        this.buffer.width / 2 + this.o, this.buffer.height / 2 + this.o, this.buffer.width / 2, this.buffer.height / 2,
        this.buffer.width / 2, 0, this.buffer.width / 2, this.buffer.height / 2
      );
      /*
      this.bufferCtx.setTransform(-1, 0, 0, -1, this.buffer.width / 2, this.buffer.height / 2)
      this.bufferCtx.drawImage(this.buffers[2],
        this.buffer.width / 2 + this.o, this.buffer.height / 2 + this.o, this.buffer.width / 2, this.buffer.height / 2,
        0, 0, this.buffer.width / 2, this.buffer.height / 2
      );
*/
      this.o += 0.01;
      //if (this.o > 48) this.o = 0;
      this.bufferCtx.restore();

      return;
/*
      this.bufferCtx.drawImage(this.buffers[1], 
        0, this.y, this.buffer.width, this.buffer.height,
        0, 0, this.buffer.width, this.buffer.height
      )
      this.y += 2;
      while (this.y > this.buffer.height) this.y -= this.buffer.height;
*/
      this.bufferCtx.globalCompositeOperation = "source-over";
    }
  });

  return $this;
})();




cAnimationPixels = (function() {

  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);
    this.defaultOptions(options, {
    });
    this.o = 0;
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationPixels',

    animate: function() {
      var img = this.bufferCtx.createImageData(this.buffer.width, this.buffer.height);
      for (var y = 0; y < this.buffer.height; y++) {
        for (var x = 0; x < this.buffer.width; x++) {
          var i = y * this.buffer.width * 4 + x * 4;
          img.data[i + 0] = (x + this.o) % 256;
          img.data[i + 1] = (y + this.o) % 256;
          img.data[i + 2] = (x * y + this.o) % 256;
          img.data[i + 3] = 255;
        }
      }
        this.o++;
      this.bufferCtx.putImageData(img, 0, 0);
    }
  });

  return $this;
})();


cAnimationLevel = (function() {

  // $this refers to the constructor.
  var $this = function (options) {
    this.parent().constructor(options);
    this.defaultOptions(options, {
      levelLength: 1000,
    });
    this.bg = document.createElement('canvas')
    this.bgCtx = this.bg.getContext("2d")
    this.bgDivisor = 10
    this.generateBackground();

    this.cl = document.createElement('canvas')
    this.clCtx = this.cl.getContext("2d")
    this.generateClouds();
    this.cx = 0;
    this.x = 0;
    this.speed = 0

    this.gnd = document.createElement('canvas')
    this.gndCtx = this.gnd.getContext("2d")
    this.generateGround();
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationLevel',

    generateBackground: function() {
      this.bg.width = this.levelLength * 32 / this.bgDivisor
      this.bg.height = this.buffer.height

      var gradient = this.bgCtx.createLinearGradient(0, 0, 0, this.bg.height)
      gradient.addColorStop(0, "#00004D")
      gradient.addColorStop(1, "#00A3EF")
      this.bgCtx.fillStyle = gradient
      this.bgCtx.fillRect(0, 0, this.bg.width, this.bg.height)

      for (var i = 0; i < 1000; i++) {
        var x = Math.random() * this.bg.width
        var y = Math.random() * this.bg.width
        var s = Math.random() * (this.bg.height / 40);
        gradient = this.bgCtx.createRadialGradient(x, y, 0, x, y, s / 4)
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        this.bgCtx.fillStyle = gradient;
        this.bgCtx.fillRect(x - s/2, y - s/2, s, s);
      }
      this.bgCtx.fillStyle = "green"
      this.bgCtx.fillRect(0, 0, 32, this.bg.height)
      this.bgCtx.fillStyle = "red"
      this.bgCtx.fillRect(this.bg.width - 32, 0, 32, this.bg.height)
    },

    generateClouds: function() {
      this.cl.width = this.buffer.width * 4
      this.cl.height = this.buffer.height * 2
      var s = this.buffer.height / 10;
      for (var i = 0; i < 50; i++) {
        $cloudgen.drawCloud(this.clCtx,
          Math.random() * this.cl.width / 2,
          Math.random() * (this.cl.height - s * 2) / 4 + s,
          s / 1.5
        )
        $cloudgen.drawCloud(this.clCtx,
          Math.random() * this.cl.width / 2,
          Math.random() * (this.cl.height - s * 2) / 4 + this.cl.height / 2 + s,
          s
        )
      }
      this.clCtx.drawImage(this.cl,
        0, 0, this.cl.width / 2, this.cl.height,
        this.cl.width / 2, 0, this.cl.width / 2, this.cl.height
      )
    },

    generateGround: function() {
      this.gnd.width = this.levelLength * 32
      this.gnd.height = this.buffer.height
      this.gndCtx.fillStyle = "yellow"
      this.gndCtx.fillRect(0, this.gnd.height / 2, 64, this.gnd.height / 2)
      this.gndCtx.fillStyle = "blue"
      this.gndCtx.fillRect(this.gnd.width - 64, this.gnd.height / 2, 64, this.bg.height / 2)
      this.gndCtx.fillStyle = "#008855"
      for (var i = 0; i < this.levelLength; i++) {
        var x = i * 32
        var h = Math.random() * 100 + 32
        var y = this.gnd.height - h
        this.gndCtx.fillRect(x, y, 32, h)
      }
    },

    animate: function() {
      var gndX = this.x
      var bgX = (this.x / this.bgDivisor);
      /**/
      this.cx = (this.timestamp / 30) * (this.buffer.height / 400)
      var cl1X = ((this.cx / 4) % (this.cl.width / 2));
      var cl2X = ((this.cx / 2) % (this.cl.width / 2));
      /**/
      this.bufferCtx.drawImage(this.bg,
        bgX, 0, this.buffer.width, this.bg.height,
        0, 0, this.buffer.width, this.bg.height
      )
      /**/
      /**/
      this.bufferCtx.drawImage(this.cl,
        //cl1X, 0, this.buffer.width, this.cl.height / 2,
        //0, 0, this.buffer.width, this.cl.height / 2
        Math.floor(cl1X), 0, this.buffer.width, this.cl.height / 2,
        -Math.floor((cl1X * 1000) % 1000) / 1000, 0, this.buffer.width, this.cl.height / 2
      )
      /**/
      /*
      this.bufferCtx.drawImage(this.cl,
        cl2X, this.cl.height / 2, this.buffer.width, this.cl.height / 2,
        0, 0, this.buffer.width, this.cl.height / 2
      )
      */
      //console.log(cl1X)
      /**/
      /*
      this.bufferCtx.drawImage(this.gnd,
        gndX, 0, this.buffer.width, this.gnd.height,
        0, 0, this.buffer.width, this.gnd.height
      )
      /**/

      this.move()
    },

    resize: function(width, height) {
      this.parent().resize(width, height)
    },

    move: function() {
      this.x += this.speed;
      if (this.speed < this.moving) this.speed += this.pace
      if (this.speed > this.moving) this.speed -= this.pace
      //else this.speed = this.pace = 0
      if (this.x < 0) {
        this.speed = 0
        this.x = 0
      }
      //console.log(this.speed)
      /*
      if (this.x > (this.bg.width - this.buffer.width) * this.bgDivisor) {
        this.speed = 0
        this.x = (this.bg.width - this.buffer.width) * this.bgDivisor
      }
      */
      //console.log(this.x + " / " + this.bg.width)
    },

    moveLeft: function() {
      this.moving = 10
      this.pace = 1
    },

    moveRight: function() {
      this.moving = -10
      this.pace = 1
    },

    moveStop: function() {
      this.moving = 0
      this.pace = 0.2
    }

  });

  return $this;
})();
