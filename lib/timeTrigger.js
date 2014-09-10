TimeTrigger = (function() {
  // $this refers to the constructor.
  var $this = function (options) {
    this.defaultOptions(options, {
      triggers: {},
      callback: function () { return (new Date().getTime() / 1000) - this.started; }
    });

    // this.parent().constructor(options);
  }

  EasyOOP.extend(null, $this, {
    chunkedTriggers: [],

    add: function(triggers) {
      for (var i in triggers) {
        if (!this.chunkedTriggers[parseInt(i)]) {
          this.chunkedTriggers[parseInt(i)] = {};
        }
        this.chunkedTriggers[parseInt(i)][i] = {callback: triggers[i]};
      }
    },

    remove: function(timeStamps) {
      for (var key in triggers) {
        var timeStamp = triggers[key];
        var idx = parseInt(key);
        if (this.chunkedTriggers[idx]) {
          for (var i in this.chunkedTriggers[idx]) {
            if (i === timeStamp) {
              delete(this.chunkedTriggers[idx][i]);
              if (this.chunkedTriggers[idx].length == 0) {
                delete(this.chunkedTriggers[idx]);
              }
            }
          }
        }
      }
    },

    enable: function() {
      if (this.intervalId) {
        return;
      }

      this.started = new Date().getTime() / 1000;
      var self = this;
      this.intervalId = setInterval(function() {
        self.intervalId = self.runTriggers(self.callback());
      }, this.interval);
    },

    disable: function() {
      clearInterval(this.intervalId);
    },

    runTriggers: function(currentTime) {
      // console.log("Running trigger: " + currentTime);
      var idx = parseInt(currentTime);
      if (this.chunkedTriggers[idx]) {
        for (var i in this.chunkedTriggers[idx]) {
          if (!this.chunkedTriggers[idx][i].fired && currentTime >= i) {
            this.chunkedTriggers[idx][i].fired = true;
            this.chunkedTriggers[idx][i].callback();
            console.log(currentTime);
          }
        }
      }
    }
  });

  return $this;
})();
