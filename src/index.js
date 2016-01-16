'use strict';

var arduino = require("johnny-five");
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var arduinoServer = require(path.resolve(__dirname + '/arduino/arduino_server'));
var cache = {};
var pins = {};

var withArduino = true;

var start = function (cb){
  //note: socket.broadcast.emit();

  // function that handles no page at address
  function send404(response) {
    response.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    response.write('Error 404: resource not found');
    response.end();
  }

  //function that sends file
  function sendFile(response, filePath, fileContents) {
    response.writeHead(
      200, {
        "Content-Type": mime.lookup(path.basename(filePath))
      }
    );
    response.end(fileContents);
  }

  //function that serves files to server
  function serveStatic(response, cache, absPath) {
    if (cache[absPath]) {
      sendFile(response, absPath, cache[absPath]);
    } else {
      fs.exists(absPath, function(exists) {
        if (exists) {
          fs.readFile(absPath, function(err, data) {
            if (err) {
              send404(response);
            } else {
              cache[absPath] = data;
              sendFile(response, absPath, data);
            }
          });
        } else {
          send404(response);
        }
      });
    }
  }

  var server = http.createServer(function(request, response) {
    var absPath = './';
    if (request.url == '/') {
      absPath += 'public/index.html';
    } else {
      absPath += 'public' + request.url;
    }

    serveStatic(response, cache, absPath);

  });

  if (withArduino) {
    arduino.Board({
      repl: false
    }).on("ready", function() {
      arduinoServer.listen(server, arduino, pins);
      server.listen(8888, function() {
        console.log("Server listening on port 8888.");
        if (typeof cb == "function") cb();
      });
    });
  } else {
    server.listen(8888, function() {
      console.log("Server listening on port 8888. Note, arduino is NOT connected");
      if (typeof cb == "function") cb();
    });
  }
}

//start main this is the main process file
if (require.main === module) {
  start();
} else {
  module.exports = start;
}
