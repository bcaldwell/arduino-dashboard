'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Read = require("./-read.js");

var routeName = "digitalRead";

var DigitalRead = (function (_Read) {
  _inherits(DigitalRead, _Read);

  function DigitalRead(arduino, io, pin) {
    _classCallCheck(this, DigitalRead);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DigitalRead).call(this, routeName, arduino, io, pin, false, 100));
  }

  return DigitalRead;
})(Read);

module.exports = {
  name: "Digital Read",
  routeName: routeName,
  init: function init(arduino, io, pin) {
    return new DigitalRead(arduino, io, pin);
  },
  class: DigitalRead
};
//# sourceMappingURL=digitalRead.js.map