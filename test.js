
// The board's pins will not be accessible until
// the board has reported that it is ready
// var val = 0;
//
// // Set pin 13 to OUTPUT mode
// this.pinMode(13, 1);
//
// // Create a loop to "flash/blink/strobe" an led
// this.loop(5000, function() {
//   this.digitalWrite(13, (val = val ? 0 : 1));

function initPin (arduino, pins, pin) {
  if (typeof pins[pin] === 'object')
  {
    console.log ("Pin is init");
  }
  else {
    console.log ("pin will be init");
    pins [pin] = {
      type: new arduino.Led(pin),
      status: 0
    };
  }
}
function changePin (pins, pin) {
  if (pins[pin].status === 0)
  {
    pins[pin].type.on();
    console.log("ON");
  }
  else
  {
    pins[pin].type.off();
    console.log("OFF");
  }
}

exports.function toggle(arduino, pins, pin) {
  initPin (arduino, pins, x);
  changePin (pins, x);
}

