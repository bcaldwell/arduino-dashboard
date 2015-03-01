var digitalWrite = require("./digitalWrite");
var digitalRead = require("./digitalRead");
var socket = require('socket.io');
var io;

exports.listen = function (server, arduino, pins) {

    io = socket.listen(server);

    io.sockets.on('connection', function (socket) {

        socket.on('new pin', function (data, fn) {
            data.pin = parseInt(data.pin);
            //            check if pin has been initialized
            if (!(typeof pins[data.pin] === 'object')) {
                console.log("Pin " + data.pin + " will be initialized");
                if (data.type === "Digital Write")
                    pins[data.pin] = new digitalWrite(arduino, data.pin);
                else if (data.type === "Digital Read")
                    pins[data.pin] = new digitalRead(arduino, io, data.pin);
            }
            fn(pins[data.pin].getStatus());
        });

        socket.on('digitalWrite', function (data, fn) {
            data = parseInt(data);
            pins[data].toggle();
            io.sockets.emit('digital:change', {
                pin: data,
                status: pins[data].getStatus()
            });
            io.sockets.emit('digital:change', {
                pin: 8,
                status: pins[data].getStatus()
            });
        });
    });
};