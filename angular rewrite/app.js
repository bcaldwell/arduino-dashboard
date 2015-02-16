(function () {
    var app = angular.module('arduino', ['angular.filter']);

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
            pinFactory.pins[that.selectedPin] = {
                pin: that.selectedPin,
                status: false,
                type: that.selectedType,
                id: ++pinFactory.id
            };
        };
    }]);

    app.controller('pinController', ['pinFactory', function (pinFactory) {
        this.pins = pinFactory.pins;

        this.selectClass = function (pin) {
            if (pin.status) {
                return "btn-success";
            };
            return "btn-danger btn-disabled";
        }

        this.toggle = function (pin) {
            pin.status = pin.status * (-1) + 1;
        };

        this.count = function () {
            return Object.keys(this.pins).length;
        }
    }]);

    app.factory('pinFactory', function () {
        return {
            id: 3,
            pins: {}
        };
    });
})();