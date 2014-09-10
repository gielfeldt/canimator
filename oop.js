

Vehicle = (function() {
  var $parent = EasyOOP;

  // console.log("DECLARING Vehicle");
  var $this = function (options) {
    console.log("Construct Vehicle");
    this.defaultOptions(options, {
      hasEngine: false,
      hasWheels: false,
    });
  };

  EasyOOP.extend($parent, $this, {
    show: function() {
      console.log(this.hasEngine + ", " + this.hasWheels);
    }
  });

  return $this;
})();

//var myVehicle = new Vehicle({hasEngine: false, hasWheels: true});
//var base = myVehicle.base();

// console.log(base);
// myVehicle.base().show(1,2);

Car = (function() {
  // console.log("DECLARING Car");
  $this = function(options) {
    console.log("Construct Car");
    // $parent.prototype.constructor.call(this, {hasEngine: true, hasWheels: true});
    this.parent().constructor({hasEngine: true, hasWheels: true});
    this.defaultOptions(options, {
      make: '',
      model: '',
      hp: 0,
    });
  },

  EasyOOP.extend(Vehicle, $this, {
    show: function() {
      // $parent.prototype.show.call(this);
      this.parent().show();
      console.log(this.make + ", " + this.model + ", " + this.hp);
    }
  });

  return $this;
})();

myBMW = new Car({make: 'BMW', model: '320i', hp: 160});
myBMW.show();
myBMW.parent().show();
/*
console.log("NEW BASE");
var mybase = myBMW.base();
// console.log(mybase);
console.log("SHOW");
mybase.show();
mybase.mtf();
*/
// console.log(myBMW.baseObject);

//myBMW.show();
// myBMW.base().show();
// console.log(myBMW.basePrototype);
// myBMW.base.show();
/*
Audi = (function() {
  var $parent = Car;

  // console.log("DECLARING Audi");
  $this = function(options) {
    console.log("Construct Audi");
    $parent.prototype.constructor.call(this, {make: "Audi", model: options.model, hp: options.hp});
    // this.base.constructor({make: "Audi", model: options.model, hp: options.hp});
    this.defaultOptions(options, {
      color: 'blue',
    });
  },

  EasyOOP.extend(Car, $this, {
    show: function() {
      $parent.prototype.show.call(this);
      console.log(this);
      // this.base.show();
      console.log(this.color);
    }
  });

  return $this;
})();

// console.log(Car.prototype);

myBMW = new Car({make: 'BMW', model: '320i', hp: 160});
myBMW.show();

myAudi = new Audi({model: 'A4', hp: 160, color: 'red'});
myAudi.show();

// console.log(myAudi.model);

*/

/*
var myCar = new Vehicle({hasWheels: true, hasEngine: true});
console.log(myCar instanceof Vehicle);
console.log(myCar instanceof testBase);
console.log(myCar instanceof testNonBase);
myCar.show();
*/
