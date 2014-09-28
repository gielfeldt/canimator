HotKey = (function () {
  // $this refers to the constructor.
  var $this = function (options) {
    this.defaultOptions(options, {});

    var self = this;

    $(window).keypress(function (e) {
      var charCode = (e.which) ? e.which : e.keyCode;
      console.log(charCode);
      var charValue = String.fromCharCode(charCode);
      //console.log(charCode);
      //console.log(charValue);

      if (self.charValues[charValue]) {
        self.charValues[charValue]();
      }

      if (self.charCodes[charCode]) {
        self.charCodes[charCode]();
      }
    });

    $(window).keydown(function (e) {
      var charCode = (e.which) ? e.which : e.keyCode;
      //console.log(charCode);
      if (self.events[charCode]) {
        self.active[charCode] = true
        self.events[charCode][0]()
      }
    });

    $(window).keyup(function (e) {
      var charCode = (e.which) ? e.which : e.keyCode;
      //console.log(charCode);
      if (self.active[charCode]) {
        delete(self.active[charCode])
        self.events[charCode][1]()
      }
    });
/*
    setInterval(function() {
      self.handleEvents.apply(self)
    }, 1000 / 60)
*/
  }

  EasyOOP.extend(null, $this, {
    charValues: {},
    charCodes: {},
    events: {},
    active: {},

    setChar: function (charValue, callback) {
      this.charValues[charValue] = callback;
    },

    setCode: function (charCode, callback) {
      this.charCodes[charCode] = callback;
    },

    unsetChar: function (charValue) {
      delete(this.charValues[charValue]);
    },

    unsetCode: function (charCode) {
      delete(this.charCodes[charCode]);
    },

    setEvent: function(charCode, callbackDown, callbackUp) {
      this.events[charCode] = [callbackDown, callbackUp];
    },

    unsetEvent: function(charCode, callback) {
      delete(this.events[charCode]);
    },

    handleEvents: function() {
      //console.log("handling")
      //console.log(this)
      for (var charCode in this.active) {
        this.events[charCode][0]()
      }
    }
  });

  return $this;
})();

HotKey.globalHotKey = new HotKey();

HotKey.setChar = function (charValue, callback) {
  HotKey.globalHotKey.setChar(charValue, callback);
}

HotKey.setCode = function (charCode, callback) {
  HotKey.globalHotKey.setCode(charCode, callback);
}

HotKey.unsetChar = function (charValue) {
  HotKey.globalHotKey.unsetChar(charValue);
}

HotKey.unsetCode = function (charCode) {
  HotKey.globalHotKey.unsetCode(charCode);
}

HotKey.setEvent = function (charCode, callbackDown, callbackUp) {
  HotKey.globalHotKey.setEvent(charCode, callbackDown, callbackUp);
}

HotKey.unsetEvent = function (charCode) {
  HotKey.globalHotKey.unsetEvent(charCode);
}
