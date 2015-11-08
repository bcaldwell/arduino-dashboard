"use strict";

var routeName = "analogWrite";
module.exports = {
  name: "Analog Write",
  routeName: routeName,
  init: function init(arduino, io, pin) {
    return new analogWrite(arduino, pin);
  },
  route: function route(data, fn, io, pins) {
    if (data.pin && data.value) {
      var pin = parseInt(data.pin);
      pins[pin].write(parseInt(data.value));
      io.sockets.emit(routeName + ':change', {
        pin: pin,
        status: pins[pin].getStatus()
      });
    }
  }
};

// update: function(){}
var analogWrite = function analogWrite(arduino, pin) {
  this.pin = pin;
  this.status = 0;
  console.log(pin + "new pin");
  this.writePin = new arduino.Led(this.pin);

  this.write = function (val) {
    val = inRange(val, 0, 255);
    this.writePin.brightness(val);
    this.status = val;
  };
  this.off = function () {
    this.writePin.on();
    this.status = 1;
  };
  this.off = function () {
    this.writePin.off();
    this.status = 0;
  };
  this.getStatus = function () {
    console.log(this.pin + " " + this.status);
    return this.status;
  };
};

var inRange = function inRange(val, min, max) {
  val = val > max ? max : val < min ? min : null;
  return val;
};
//# sourceMappingURL=analogWrite.js.map