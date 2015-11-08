'use strict';

var Read = require("./-read.js");

var routeName = "analogRead";

class AnalogRead extends Read {
  constructor(arduino, io, pin) {
    //  constructor(routeName, arduino, io, pin, analog, minDuration) {
    super(routeName, arduino, io, pin, true, 300)
  }
}

module.exports = {
  name: "Analog Read",
  routeName: routeName,
  init: function(arduino, io, pin) {
    return new AnalogRead(arduino, io, pin);
  },
  class: AnalogRead
};
