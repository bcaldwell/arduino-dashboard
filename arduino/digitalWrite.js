module.exports = function (arduino, pin) {
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
        return this.status;
    };
};