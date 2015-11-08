'use strict';

var routeName = "digitalRead";

class DigitalRead {
  constructor(arduino, io, pin) {
    var self = this;
    this.pin = "A0";
    this.status = 0;
    this.lastStatus = null;
    this.readPin = new arduino.Pin(this.pin);
    this.analogPin = true;

    this.readPin.read(function(error, value) {
      self.setStatus(self.analogToDigital(value));
      console.log (value);
      if (self.status !== self.lastStatus && self.status !== null) {
        io.sockets.emit(routeName + ':change', {
          pin: self.pin,
          status: self.status
        });
      }
    });
  }
  getStatus() {
    return this.status;
  }
  setStatus(status){
    this.lastStatus = this.status;
    this.status = status
  }
  analogToDigital(val){
    return (this.analogPin && val < 512?0:1);
  }
}

module.exports = {
  name: "Digital Read",
  routeName: routeName,
  init: function(arduino, io, pin) {
    return new DigitalRead(arduino, io, pin);
  },
  class: DigitalRead
};

// var digitalRead = function(arduino, io, pin) {
//   var that = this;

//   this.pin = "A2";
//   this.status = 0;
//   this.lastStatus = null;
//   this.readPin = new arduino.Pin(this.pin);
//   this.analogPin = true;

//   this.readPin.read(function(error, value) {
//     that.setStatus(that.analogToDigital(value));
//     if (that.status !== that.lastStatus && that.status !== null) {
//       io.sockets.emit(routeName + ':change', {
//         pin: that.pin,
//         status: that.status
//       });
//     }
//   });

//   this.getStatus = function() {
//     return this.status;
//   };
//   this.setStatus = function(status){
//     this.lastStatus = this.status;
//     this.status = status;
//   };
//   this.analogToDigital = function(val){
//     return (this.analogPin && val < 512?0:1);
//   };
// };
