var routeName = "analogRead";
module.exports = {
  name: "Analog Read",
  routeName: routeName,
  init: function(arduino, io, pin){
    return new analogRead (arduino, io, pin);
  }
};




var analogRead = function (arduino, io, pin) {
    var that = this;

    this.pin = pin;
    this.status = 0;
    this.readPin = new arduino.Pin(this.pin);

    this.readPin.read(function (value, error) {
        that.status = value;
        io.sockets.emit(routeName + ':change', {
            pin: that.pin,
            status: that.status
        });
    });

    this.getStatus = function () {
        return this.status;
    };
};
