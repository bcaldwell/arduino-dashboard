'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Read = require("./-read.js");

var routeName = "analogRead";

var AnalogRead = (function (_Read) {
  _inherits(AnalogRead, _Read);

  function AnalogRead(arduino, io, pin) {
    _classCallCheck(this, AnalogRead);

    //  constructor(routeName, arduino, io, pin, analog, minDuration) {
    return _possibleConstructorReturn(this, Object.getPrototypeOf(AnalogRead).call(this, routeName, arduino, io, pin, true, 300));
  }

  return AnalogRead;
})(Read);

module.exports = {
  name: "Analog Read",
  routeName: routeName,
  init: function init(arduino, io, pin) {
    return new AnalogRead(arduino, io, pin);
  },
  class: AnalogRead
};
//# sourceMappingURL=analogRead.js.map