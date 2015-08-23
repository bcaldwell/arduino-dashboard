var routeName = "digitalRead";
module.exports = {
  name: "Digital Read",
  routeName: routeName,
  init: function(arduino, io, pin) {
    return new digitalRead(arduino, io, pin);
  },
  class: digitalRead
};

var digitalRead = function(arduino, io, pin) {
  var that = this;

  this.pin = "A2";
  this.status = 0;
  this.lastStatus = null;
  this.readPin = new arduino.Pin(this.pin);
  this.analogPin = true;

  this.readPin.read(function(error, value) {
    that.setStatus(that.analogToDigital(value));
    if (that.status !== that.lastStatus && that.status !== null) {
      io.sockets.emit(routeName + ':change', {
        pin: that.pin,
        status: that.status
      });
    }
  });

  this.getStatus = function() {
    return this.status;
  };
  this.setStatus = function(status){
    this.lastStatus = this.status;
    this.status = status;
  };
  this.analogToDigital = function(val){
    return (this.analogPin && val < 512?0:1);
  };
};
