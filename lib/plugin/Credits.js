cAnimationCredits = (function() {

  // $this refers to the constructor.
  var $this = function (options) {    
    this.parent().constructor(options);

    this.defaultOptions(options, {
      credits: [],
    });

    for (var i in credits) {
      credits[i].font = {
        family: "verdana",
        height: 32,
      }
      credits[i].buffer = document.createElement("canvas");
      credits[i].buffer.width = 4000;
      credits[i].buffer.height = credits[i].font.height * 1.5;
      credits[i].ctx = credits[i].buffer.getContext("2d");

    }
  };

  // inherit and declare.
  EasyOOP.extend(cAnimationBase, $this, {
    name: 'cAnimationCredits',
    setupFont: function (credit) {
      credit.ctx.font = credit.font.height + "px " + credit.font.family;
      credit.ctx.textBaseline = "top";
      credit.ctx.strokeStyle = "black";
      credit.ctx.lineWidth = 3;
      credit.ctx.fillStyle = "white";
      credit.buffer.width = credit.ctx.measureText(credit.text).width;
      credit.ctx.fillText(credit.text, 0, 0);
    },

    animate: function () {

    }
  });

  return $this;
})();

