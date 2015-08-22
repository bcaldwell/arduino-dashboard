var routeName = "digitalRead";
module.exports = {
  name: "Digital Read",
  routeName: routeName,
  init: function(arduino, io, pin){
    return new digitalRead (arduino, io, pin);
  }
};




var digitalRead = function (arduino, io, pin) {
    var that = this;

    this.pin = pin;
    this.status = 0;
    this.readPin = new arduino.Pin(this.pin);

    this.readPin.read(function (value, error) {
      console.log (value);
        that.status = value;
        if (that.status !== null){
          io.sockets.emit(routeName + ':change', {
              pin: that.pin,
              status: that.status
          });
        }
    });

    this.getStatus = function () {
        return this.status;
    };
};
