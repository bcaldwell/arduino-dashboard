var routeName = "analogWrite";
module.exports = {
  name: "Analog Write",
  routeName: routeName,
  init: function(arduino, io, pin) {
    return new analogWrite(arduino, pin);
  },
  route: function(data, fn, io, pins) {
    data = parseInt(data);
    pins[data].write(100);
    io.sockets.emit(routeName + ':change', {
      pin: data,
      status: pins[data].getStatus()
    });
  },
  // update: function(){}
};


analogWrite = function(arduino, pin) {
  this.pin = pin;
  this.status = 0;
  console.log (pin + "new pin");
  this.writePin = new arduino.Led(this.pin);

  this.write = function(val) {
    console.log ("writing");
    this.writePin.brightness(val);
    this.status = val;
  };
  this.off = function() {
    this.writePin.on();
    this.status = 1;
  };
  this.off = function() {
    this.writePin.off();
    this.status = 0;
  };
  this.getStatus = function() {
    console.log(this.pin + " " + this.status);
    return this.status;
  };
};
