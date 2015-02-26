var toggle = require("./toggle");
var socket = require('socket.io');
var io;

exports.listen = function (server, arduino, pins) {
    io = socket.listen(server);
    io.set('log level', 1);

    io.sockets.on('connection', function (socket) {

        socket.emit('hello', 'test');

        socket.on('new pin', function (data, fn) {
            data = parseInt(data);
            toggle.initPin(arduino, pins, data);
            fn(pins[data].status);
        });

        socket.on('digitalWrite', function (data, fn) {
            data = parseInt(data);
            console.log(data);
            toggle.toggle(arduino, pins, data);
            socket.broadcast
            io.sockets.emit('digital:change', {
                pin: data,
                status: pins[data].status
            });
            // io.sockets.emit ('pin change', data);
        });


    });
};