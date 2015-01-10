$(window).ready(function () {
  var socket = io.connect();

  var pins = {};
  var numBoxes = 0;

  //populate pin selection drop down
  function DropDown () {
    var html = '';
    for (i = 1; i < 14; i++){
      // $("<option>"+i+"</option>").appendTo('#pin-selection');
      html += "<option>"+i+"</option>";
    }
    $('#pin-selection').html (html);
  }

  function togglePin (pin, status) {
    if (!status) {
      pin.css("background", "rgba(255, 0, 0, 0.5)");
    }
    else {
      pin.css("background", "rgba(0, 128, 0, 0.5)");
    }
    // if (socket) socket.emit('pin', pin.text().substring(4));
  }
  DropDown();

  // var pin = 0;
  $pinSetup = $('#pin-setup');
  $pinSelection = $('#pin-selection');
  $("#addBoxes").on('click', '.box', function () {
    console.log (pins[pin]);
    $("<div >Pin " + pin + "</div>").attr('class', 'box').appendTo('#pinBoxes');
    pins [pin] = numBoxes;
    numBoxes ++;
    console.log (pins);

  });
  $("#pinBoxes").on('click', '.box', function () {
    // if ($(this).css("backgroundColor") === "rgb(0, 128, 0)") {
    //   // socket.emit('pin', $(this).text().substring(4));
    //   $(this).css("background", "red");
    // }
    // else {
    //   // socket.emit('pin', $(this).text().substring(4));
    //   $(this).css("background", "green");
    // }
    socket.emit('pin', $(this).text().substring(4));
    // togglePin($(this), socket);
  });
  $pinSetup.submit (function(e) {
    var pin = $pinSelection.val();
    console.log(typeof (pins[parseInt(pin)]));
    if (typeof (pins[parseInt(pin)])!=="number"){
      console.log (pin);
      $("<div>Pin " + pin + "</div>").attr('class', 'box').appendTo('#pinBoxes');
      pins [pin] = numBoxes;
      numBoxes ++;
      console.log (pins);
      socket.emit ('new pin', pin, function (data) {
        togglePin ($('.box').eq(pins[pin]), data);
      });
    }

    return false;
  });

  socket.on ('pin change', function (data) {
    console.log ('yep' + data);
    togglePin ($('.box').eq(pins[data.pin]),data.status);
  });

});
