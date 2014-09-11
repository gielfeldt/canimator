HotKey = (function () {
  // $this refers to the constructor.
  var $this = function (options) {
    this.defaultOptions(options, {});

    var self = this;

    $(window).keypress(function (e) {
      var charCode = (e.which) ? e.which : e.keyCode;
      var charValue = String.fromCharCode(charCode);

      if (self.charValues[charValue]) {
        self.charValues[charValue]();
      }

      if (self.charCodes[charCode]) {
        self.charCodes[charCode]();
      }
    });
  }

  EasyOOP.extend(null, $this, {
    charValues: {},
    charCodes: {},

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
