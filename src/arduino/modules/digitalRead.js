'use strict';

var Read = require("./-read.js");

var routeName = "digitalRead";

class DigitalRead extends Read {
  constructor(arduino, io, pin) {
    super(routeName, arduino, io, pin, false, 100)
  }
}

module.exports = {
  name: "Digital Read",
  routeName: routeName,
  init: function (arduino, io, pin) {
    return new DigitalRead(arduino, io, pin);
  },
  class: DigitalRead
};