// This is a constructor that is used to setup inheritance without
// invoking the base's constructor. It does nothing, so it doesn't
// create properties on the prototype like our previous example did
function surrogateCtor() {}

function extend(base, sub, methods) {
  surrogateCtor.prototype = base.prototype;
  sub.prototype = new surrogateCtor();
  sub.prototype.constructor = sub;
  // Add a reference to the parent's prototype
  sub.base = base.prototype;

  // Copy the methods passed in to the prototype
  for (var name in methods) {
    sub.prototype[name] = methods[name];
  }
  // so we can define the constructor inline
  // return sub;
}

// Let's try this
function Animal(name) {
  console.log("Constructing animal: " + name);
  this.name = name;
}
 
Animal.prototype = {
  sayMyName: function() {
    console.log(this.getWordsToSay() + " " + this.name);
  },
  getWordsToSay: function() {
    // Abstract
  }
}
 
Dog = (function(){
  // $this refers to the constructor
  var $this = function (name) {
    console.log(name);
    // Look, no hardcoded reference to this class's name
    // $this.base.constructor.call(this, name);
    // Animal.call(this, name);
    console.log($this.base)
  };

  console.log("EXTENDING");

  extend(Animal, $this, {
    getWordsToSay: function(){
      return "Ruff Ruff";
    }
  });

  return $this;
})();

var dog = new Dog("Lassie");
dog.sayMyName(); // Outputs Ruff Ruff Lassie
console.log(dog instanceof Animal); // true
console.log(dog.constructor); // Dog
console.log("name" in Dog.prototype)// false

