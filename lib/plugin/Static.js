cAnimationStatic = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      strength: 4,
      opacity: 1,
      duration: 5000,
    });

    this.noise = [];
    this.noiseCtx = [];

    for (var i = 0; i < 10; i++) {      
      this.noise[i] = document.createElement('canvas');
      this.noise[i].width = this.buffer.width;
      this.noise[i].height = this.buffer.height;
      this.noiseCtx[i] = this.noise[i].getContext("2d");

      var points = this.buffer.width * this.buffer.height * this.strength / 100;
      console.log("Populating: " + i + " with " + points + "points");
      for (var p = 0; p < points; p++) {
        var x = Math.floor(Math.random() * this.buffer.width);
        var y = Math.floor(Math.random() * this.buffer.height);
        var c = Math.floor(Math.random() * 200);
        this.noiseCtx[i].fillStyle = "rgba(" + c + "," + c + "," + c + "," + this.opacity + ")";
        this.noiseCtx[i].fillRect(x, y, 1, 1);
      }
    }
    this.frame = 0;
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationStatic',

    animate: function () {
      if (this.timestamp > this.duration) {
        this.stop();
        return;
      }

      this.bufferCtx.drawImage(this.noise[this.frame], 0, 0);
      this.frame = (this.frame + 1) % this.noise.length;
    },

    start: function () {
      this.frame = 0;
      this.parent().start();
    }
  });

  return $this;
})();

