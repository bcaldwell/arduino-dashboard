'use strict';

function setDefault(param, value) {
  return (typeof param === "undefined" ? value : param);
}

class Read {
  constructor(routeName, arduino, io, pin, analog, minDuration) {
    // var self = this;

    analog = setDefault(analog, false);
    minDuration = setDefault(minDuration, 200);

    this.routeName = routeName;
    this.pin = pin;
    this.arduino = arduino;

    this.status = 0;
    this.lastStatus = null;
    this.readPin = new arduino.Pin(this.pin);

    //is the selected pin an analog pin?
    this.analogPin = this.isAnalog(pin);
    this.lastSendTime = 0;

    //analog mode or digital mode
    this.analog = Boolean(analog);
    this.minDuration = minDuration;
    this.last = {
      sendTime: 0,
      sendStatus: null,
      status: null
    };

    this.readPin.read((error, value) => {
      if (this.analog) {
        this.setStatus(value);
      } else {
        this.setStatus(this.analogToDigital(value));
      }
      var time = Date.now();
      if (this.status !== this.last.status && this.status !== this.last.sendStatus && time - this.last.sendTime > this.minDuration) {
        io.sockets.emit(routeName + ':change', {
          pin: this.pin,
          status: this.status
        });
        this.last.sendTime = time;
        this.last.sendStatus = this.status;
      }
    });
  }

  getStatus() {
    return this.status;
  }
  setStatus(status) {
    this.last.status = this.status;
    this.status = status;
  }
  analogToDigital(val) {
    //only analog pin need the value adjected for digital read
    if (this.analogPin) {
      return (this.analogPin && val < 512 ? 0 : 1);
    } else {
      return val;
    }
  };
  //remove this
  isAnalog(pin) {
    return Boolean(this.arduino.Pin.isAnalog(pin));
  };
};

module.exports = Read;
