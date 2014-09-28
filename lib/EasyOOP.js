// Inspired by: http://js-bits.blogspot.com.au/2010/08/javascript-inheritance-done-right.html

// This is a constructor that is used to setup inheritance without
// invoking the base's constructor. It does nothing, so it doesn't
// create properties on the prototype like our previous example did
// function testObject() {}

// Our EasyOOP object.
function EasyOOP() {}

/**
 * EasyOOP inheritance.
 *
 * @param object base Base object
 * @param object sub Child object
 * @param array methods methods/properties for child object
 * @return object prepared child object
 */
EasyOOP.extend = function(base, sub, methods) {
  EasyOOP.prototype = base ? base.prototype : EasyOOPBase.prototype;
  sub.prototype = new EasyOOP();
  sub.prototype.constructor = sub;
  sub.prototype.parentClass = base;

  // Copy the methods passed in to the prototype.
  for (var name in methods) {
    sub.prototype[name] = methods[name];
  }
  console.log(sub.prototype)
  // so we can define the constructor inline.
  return sub;
}

function EasyOOPBase() {}

/**
 * Get parent object with magic methods.
 * @return object Magic parent object.
 */
EasyOOPBase.prototype.parent = function() {
  if (!this.parentObject) {
    // Create a clean instance of the parent class
    // containing a reference to ourselves ($this)
    EasyOOP.prototype = this.parentClass.prototype;
    this.parentObject = new EasyOOP();
    this.parentObject.$this = this;

    // We need to transfer "this" to sub-scopes.
    var self = this;

    // Create magic methods in the parent object,
    // which transfers "this" correctly.
    for (var name in this.parentClass.prototype) {
      if (typeof this[name] === "function") {

        (function(name, self) {
          self.parentObject[name] = function() {

            return self.parentClass.prototype[name].apply(self, arguments);
          }
        })(name, self);
      }
    }

  }
  return this.parentObject;
}

/**
 * Helper function for easily setting default values
 * @param array options Options to set
 * @param array defaults Default options
 */
EasyOOPBase.prototype.defaultOptions = function(options, defaults) {
  for (var name in defaults) {
    this[name] = (name in options) ? options[name] : defaults[name]
  }
}

EasyOOPBase.prototype.defaultProperties = function(properties) {
  for (var name in properties) {
    this[name] = properties[name]
  }
}
