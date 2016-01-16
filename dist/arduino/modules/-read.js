'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function setDefault(param, value) {
  return typeof param === "undefined" ? value : param;
}

var Read = (function () {
  function Read(routeName, arduino, io, pin, analog, minDuration) {
    var _this = this;

    _classCallCheck(this, Read);

    // var self = this;

    analog = setDefault(analog, false);
    minDuration = setDefault(minDuration, 200);

    this.routeName = routeName;
    this.pin = pin;
    this.arduino = arduino;

    this.status = 0;
    this.lastStatus = null;
    this.readPin = new arduino.Pin(this.pin);

    //is the selected pin an analog pin?
    this.analogPin = this.isAnalog(pin);
    this.lastSendTime = 0;

    //analog mode or digital mode
    this.analog = Boolean(analog);
    this.minDuration = minDuration;
    this.last = {
      sendTime: 0,
      sendStatus: null,
      status: null
    };

    this.readPin.read(function (error, value) {
      if (_this.analog) {
        _this.setStatus(value);
      } else {
        _this.setStatus(_this.analogToDigital(value));
      }
      var time = Date.now();
      if (_this.status !== _this.last.status && _this.status !== _this.last.sendStatus && time - _this.last.sendTime > _this.minDuration) {
        io.sockets.emit(routeName + ':change', {
          pin: _this.pin,
          status: _this.status
        });
        _this.last.sendTime = time;
        _this.last.sendStatus = _this.status;
      }
    });
  }

  _createClass(Read, [{
    key: 'getStatus',
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: 'setStatus',
    value: function setStatus(status) {
      this.last.status = this.status;
      this.status = status;
    }
  }, {
    key: 'analogToDigital',
    value: function analogToDigital(val) {
      //only analog pin need the value adjected for digital read
      if (this.analogPin) {
        return this.analogPin && val < 512 ? 0 : 1;
      } else {
        return val;
      }
    }
  }, {
    key: 'isAnalog',

    //remove this
    value: function isAnalog(pin) {
      return Boolean(this.arduino.Pin.isAnalog(pin));
    }
  }]);

  return Read;
})();

;

module.exports = Read;
//# sourceMappingURL=-read.js.map