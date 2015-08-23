var analogRead = function(arduino, io, pin) {
    var that = this;

    this.pin = pin;
    this.status = 0;
    this.lastStatus = null;
    this.readPin = new arduino.Pin(this.pin);

    this.readPin.read(function(error, value) {
        console.log(value);
        that.setStatus(value);
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
    }
};

var routeName = "analogRead";
module.exports = {
    name: "Analog Read",
    routeName: routeName,
    init: function(arduino, io, pin) {
        return new analogRead(arduino, io, pin);
    },
    class: analogRead
};
