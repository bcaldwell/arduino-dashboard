var toggle = require("./toggle");
var socket = require('socket.io');
var io;

exports.listen = function(server, arduino, pins) {
  io = socket.listen(server);
  io.set('log level', 1);

  io.sockets.on('connection', function (socket) {

    socket.on ('new pin', function (data, fn) {
      data = parseInt(data);
      toggle.initPin (arduino, pins, data);
      fn(pins[data].status);
    });

    socket.on('pin', function (data) {
      data = parseInt(data);
      console.log(data);
      toggle.toggle (arduino, pins, data);
      // socket.broadcast
      io.sockets.emit ('pin change', {pin:data, status:pins[data].status});
      // io.sockets.emit ('pin change', data);
    });

    socket.on ('add-msg', function (data) {
      console.log('server socket add-msg reached');
      console.log(data);
      socket.broadcast.emit('new msg',{user:socket.nickname, msg:data});
    });

  })
;};
