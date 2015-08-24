var fs = require('fs');
var socket = require('socket.io');
var Q = require('q');
var io;

//read modules into json object
//use q to read modules before continuing
var modules = {};
var deferred = Q.defer();
fs.readdir('./arduino/modules', function(err, files) {
  if (err) console.log(err);
  for (var i = 0; i < files.length; i++) {
    (function(i) {
      if (files[i][0] !== "-") {

        var module = require('./modules/' + files[i]);
        modules[module.name] = module;
        if (i === files.length - 1) {
          deferred.resolve();
        }
      }
    })(i);
  }
});

deferred.promise.then(function() {
  exports.listen = function(server, arduino, pins) {

    io = socket.listen(server);


    io.sockets.on('connection', function(socket) {
      socket.on('error', function(a, b) {
        console.log("Error");
        console.log(a);
        console.log(b);
      });

      socket.on('new pin', function(data, fn) {
        //todo only change if different otherwise dont do anything
        !fn ? fn = function(msg) {
          io.to(this.id).emit(msg)
        }.bind(this) : null;
        //data.pin = parseInt(data.pin);
        if (modules[data.type]){
          pins[data.pin] = modules[data.type].init(arduino, io, data.pin);
          fn(pins[data.pin].getStatus());
        } else {
          console.log ("No module named: " + data.type);
        }

      });
      Object.keys(modules).forEach(function(name, i) {
        console.log(name + " " + i);
        if (modules[name].route) {
          socket.on(modules[name].routeName, function(data, fn) {
            modules[name].route(data, fn, io, pins);
          });
        }
      });
    });
  };
});
