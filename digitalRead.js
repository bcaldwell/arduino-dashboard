module.exports = function (arduino, io, pin) {
    this.pin = pin;
    this.status = 0;
    this.readPin = new arduino.Pin(this.pin);

    this.readPin.read(function (value, error) {
        this.status = value;
        io.sockets.emit('digital:change', {
            pin: this.pin,
            status: this.status
        });
    });

    this.getStatus = function () {
        return this.status;
    };
};