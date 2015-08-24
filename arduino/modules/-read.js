var read = function(arduino, io, pin) {
  var that = this;

  this.pin = pin;
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

module.exports = read;
