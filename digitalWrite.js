function initPin(arduino, pins, pin) {
    if (typeof pins[pin] === 'object') {
        console.log("Pin is init");
    } else {
        console.log("pin will be init");
        pins[pin] = {
            type: new arduino.Button(pin),
            status: 0
        };
    }
}

function changePin(pins, pin) {
    if (pins[pin].status === 0) {
        pins[pin].type.on();
        console.log("ON");
        pins[pin].status = 1;
    } else {
        pins[pin].type.off();
        console.log("OFF");
        pins[pin].status = 0;
    }
}

module.exports = function (arduino, pin) {
    this.pin = pin;
    this.status = 0;
    this.writePin = new arduino.Pin(this.pin);

    this.on = function () {
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