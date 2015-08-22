var routeName = "digitalWrite";
module.exports = {
  name: "Digital Write",
  routeName: routeName,
  init: function(arduino, io, pin){
    return new digitalWrite (arduino, pin);
  },
  route: function(data, fn, io, pins) {
    data = parseInt(data);
    pins[data].toggle();
    io.sockets.emit(routeName + ':change', {
      pin: data,
      status: pins[data].getStatus()
    });
  },
  // update: function(){}
};


digitalWrite = function (arduino, pin) {
    this.pin = pin;
    this.status = 0;
    this.writePin = new arduino.Pin(this.pin);

    this.on = function () {
        this.writePin.write(1);
        this.writePin.write(1);

        this.status = 1;
    };
    this.off = function () {
        this.writePin.write(0);
        this.status = 0;
    };
    this.toggle = function () {
        this.status = this.status * (-1) + 1;
        this.writePin.write(this.status);
    };
    this.getStatus = function () {
      console.log (this.pin + " " + this.status);
        return this.status;
    };
};
