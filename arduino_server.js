var toggle = require("./toggle");
var digitalWrite = require("./digitalWrite");
var socket = require('socket.io');
var io;

exports.listen = function (server, arduino, pins) {

    //    var test = new digitalWrite(arduino, 3);
    //    console.log(test.getStatus());
    //    test.off();
    //    console.log(test.getStatus());

    io = socket.listen(server);

    io.sockets.on('connection', function (socket) {


        socket.on('new pin', function (data, fn) {
            data = parseInt(data);
            console.log(data);

            //            check if pin has been initialized
            if (!(typeof pins[data] === 'object')) {
                console.log("Pin " + data + " will be initialized");
                pins[data] = new digitalWrite(arduino, data);
            }
            fn(pins[data].getStatus());

            //            fn();


            //            toggle.initPin(arduino, pins, data);
            //            var test = new digitalWrite(arduino, data);
            //            fn(pins[data].status);
        });


        socket.on('digitalWrite', function (data, fn) {
            data = parseInt(data);
            pins[data].toggle();
            io.sockets.emit('digital:change', {
                pin: data,
                status: pins[data].getStatus()
            });
        });
    });
};