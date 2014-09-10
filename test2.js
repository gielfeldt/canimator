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
    return "Say";
  }
}
/* 
Dog = (function(){
  // $this refers to the constructor
  var $this = function (name) {
    console.log(name);
    // Look, no hardcoded reference to this class's name
    $this.base.constructor.call(this, name);
  };

  extend(Animal, $this, {
    getWordsToSay: function(){
      return "Ruff Ruff";
    }
  });

  return $this;
})();
 */

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = new Animal();

var dog = new Dog("Lassie");
dog.sayMyName(); // Outputs Ruff Ruff Lassie
console.log(dog instanceof Animal); // true
console.log(dog.constructor); // Dog
console.log("name" in Dog.prototype)// false

