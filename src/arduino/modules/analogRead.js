var routeName = "analogRead";
module.exports = {
  name: "Analog Read",
  routeName: routeName,
  init: function(arduino, io, pin) {
    return new analogRead(arduino, io, pin);
  },
};

var analogRead = function(arduino, io, pin) {
  var that = this;

  this.pin = pin;
  this.status = 0;
  this.lastStatus = null;
  this.readPin = new arduino.Pin(this.pin);
  this.analogPin = true;
  this.lastSendTime = 0;

  this.readPin.read(function(error, value) {
    that.setStatus(that.analogToDigital(value));
    var time = Date.now();
    if (that.status !== that.lastStatus && that.status !== null && time - that.lastSendTime > 100) {
      // console.log (that.status);
      io.sockets.emit(routeName + ':change', {
        pin: that.pin,
        status: that.status
      });
      that.lastSendTime = time;
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
    return val;
  };
};
