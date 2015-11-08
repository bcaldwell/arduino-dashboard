'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var routeName = "digitalRead";

var DigitalRead = (function () {
  function DigitalRead(arduino, io, pin) {
    _classCallCheck(this, DigitalRead);

    var self = this;
    this.pin = "A0";
    this.status = 0;
    this.lastStatus = null;
    this.readPin = new arduino.Pin(this.pin);
    this.analogPin = true;

    this.readPin.read(function (error, value) {
      self.setStatus(self.analogToDigital(value));
      console.log(value);
      if (self.status !== self.lastStatus && self.status !== null) {
        io.sockets.emit(routeName + ':change', {
          pin: self.pin,
          status: self.status
        });
      }
    });
  }

  _createClass(DigitalRead, [{
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      this.lastStatus = this.status;
      this.status = status;
    }
  }, {
    key: "analogToDigital",
    value: function analogToDigital(val) {
      return this.analogPin && val < 512 ? 0 : 1;
    }
  }]);

  return DigitalRead;
})();

module.exports = {
  name: "Digital Read",
  routeName: routeName,
  init: function init(arduino, io, pin) {
    return new DigitalRead(arduino, io, pin);
  },
  class: DigitalRead
};

// var digitalRead = function(arduino, io, pin) {
//   var that = this;

//   this.pin = "A2";
//   this.status = 0;
//   this.lastStatus = null;
//   this.readPin = new arduino.Pin(this.pin);
//   this.analogPin = true;

//   this.readPin.read(function(error, value) {
//     that.setStatus(that.analogToDigital(value));
//     if (that.status !== that.lastStatus && that.status !== null) {
//       io.sockets.emit(routeName + ':change', {
//         pin: that.pin,
//         status: that.status
//       });
//     }
//   });

//   this.getStatus = function() {
//     return this.status;
//   };
//   this.setStatus = function(status){
//     this.lastStatus = this.status;
//     this.status = status;
//   };
//   this.analogToDigital = function(val){
//     return (this.analogPin && val < 512?0:1);
//   };
// };
//# sourceMappingURL=digitalRead.js.map