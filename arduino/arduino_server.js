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
      var module = require('./modules/' + files[i]);
      modules[module.name] = module;
      if (i === files.length - 1) {
        deferred.resolve();
      }
    })(i);
  }
});

deferred.promise.then(function() {
  console.log (modules);
  exports.listen = function(server, arduino, pins) {

    io = socket.listen(server);


    io.sockets.on('connection', function(socket) {
      socket.on('error', function(a,b) {
        console.log ("Error");
        console.log (a);
        console.log(b);
      });

      socket.on('new pin', function(data, fn) {
        //todo only change if different otherwise dont do anything
        data.pin = parseInt(data.pin);
        pins[data.pin] = modules[data.type].init(arduino, io,  data.pin);
        fn(pins[data.pin].getStatus());
      });
      Object.keys(modules).forEach(function(name, i) {
        console.log (name + " " +i);
        if (modules[name].route) {
          socket.on(modules[name].routeName, function(data, fn) {
            modules[name].route(data, fn, io, pins);
          });
        }
      });
    });
  };
});
