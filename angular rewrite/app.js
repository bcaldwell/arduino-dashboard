(function () {
    var app = angular.module('arduino', ['angular.filter', 'highcharts-ng', 'ui.bootstrap']);

    app.controller('addPinController', ['pinFactory', function (pinFactory) {
        var that = this;
        this.pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.type = ["Digital Write", "Digital Read"]

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
            console.log(pin);
            pin.status = pin.status * (-1) + 1;
        };

        this.count = function () {
            return Object.keys(this.pins).length;
        }
    }]);

    app.controller('highchartsController', ['$scope', 'pinFactory', function ($scope, pinFactory) {

        var that = this;
        this.pin = {
            status: 0
        };
        this.init = function (pin) {
            that.pin = pin;
            console.log(that.pin);
        }

        $scope.$watch(function () {
            return that.pin.status;
        }, function (newValue, oldValue) {
            var chart = that.solidGaugeSmall.getHighcharts();
            var point = chart.series[0].points[0];
            point.update(newValue);
        });

        this.toggle = function (pin) {

            that.pin.status = that.pin.status * (-1) + 1;
        };

        this.solidGaugeSmall = {
            options: {
                chart: {
                    type: 'solidgauge',
                    backgroundColor: 'rgba(0,0,0,0)'

                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: '160%',
                    startAngle: -75,
                    endAngle: 75,
                    background: {
                        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
            },
            series: [{
                name: 'boo',
                data: [1],
                dataLabels: {
                    enabled: false,
                }
        }],
            yAxis: {
                min: 0,
                max: 1,
                stops: [
                [0, '#DF5353'], // green
                [1, '#55BF3B'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    text: null,
                    y: -70
                },
                labels: {
                    y: 16
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: null,
                data: [1],
                dataLabels: {
                    enabled: false,
                }
        }],
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            loading: false
        }
    }]);

    app.factory('pinFactory', function () {
        return {
            id: 0,
            pins: {}
        };
    });
})();