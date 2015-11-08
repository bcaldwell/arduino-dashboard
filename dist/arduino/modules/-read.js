'use strict';

var read = function read(arduino, io, pin, analog, minDuration) {
  analog = analog || false;
  minDuration = minDuration || 100;
  var that = this;

  this.pin = pin;
  this.status = 0;
  this.lastStatus = null;
  this.readPin = new arduino.Pin(this.pin);
  this.analogPin = true;
  this.lastSendTime = 0;
  this.analog = Boolean(analog);
  this.minDuration = minDuration;
  this.last = {
    sendTime: 0,
    sendStatus: null,
    status: null
  };

  this.readPin.read(function (error, value) {
    if (this.analog) {
      that.setStatus(value);
    } else {
      that.setStatus(that.analogToDigital(value));
    }
    var time = Date.now();
    if (that.status !== that.last.status && that.status !== that.last.sendStatus && time - that.last.SentTime > that.minDuration) {
      // console.log (that.status);
      io.sockets.emit(routeName + ':change', {
        pin: that.pin,
        status: that.status
      });
      that.last.sendTime = time;
    }
  });

  this.getStatus = function () {
    return this.status;
  };
  this.setStatus = function (status) {
    this.last.status = this.status;
    this.status = status;
  };
  this.analogToDigital = function (val) {
    return this.analogPin && val < 512 ? 0 : 1;
  };
  //remove this
  this.isAnalog = function (pin) {
    return arduino.isAnalog(pin);
  };
};

modules.exports = read;
//# sourceMappingURL=-read.js.map