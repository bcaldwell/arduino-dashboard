(function () {
    var app = angular.module('arduino', []);

    app.controller('addPinController', ['pinFactory', function (pinFactory) {
        var that = this;
        this.pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.type = ["Digial Write", "Digital Read"]

        this.selectClass = function () {
            if (that.selectedPin && that.selectedType) {
                return false;

                return "btn-success";
            }
            return true;
            return "btn-danger";
        }

        this.addPin = function () {
            pinFactory.push({
                pin: that.selectedPin,
                status: false,
                type: that.selectedType
            });
        };
    }]);

    app.controller('pinController', ['pinFactory', function (pinFactory) {
        this.pins = pinFactory;

        this.selectClass = function (pin) {
            if (pin.status) {
                return "btn-success";
            };
            return "btn-danger btn-disabled";
        }

        this.toggle = function (pin) {
            pin.status = pin.status * (-1) + 1;
        };
    }]);

    app.factory('pinFactory', function () {
        return [{
            pin: 4,
            status: false,
            type: "input"
                }, {
            pin: 5,
            status: true,
            type: "input"
                }, {
            pin: 8,
            status: true,
            type: "input"
                }];
    });
})();