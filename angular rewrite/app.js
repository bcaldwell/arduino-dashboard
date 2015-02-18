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

    app.controller('pinController', ['$scope', 'pinFactory', function ($scope, pinFactory) {
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

        this.chartConfig = {
            options: {
                chart: {
                    type: 'solidgauge',
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                pane: {
                    center: ['50%', '85%'],
                    size: '180%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                solidgauge: {
                    dataLabels: {
                        enabled: false,
                    }
                },
                tooltip: {
                    enabled: false
                },
            },
            series: [{
                data: [6],
                dataLabels: {
                    format: '{y}',
                    enabled: false
                }
                }],
            title: {
                text: 'Solid Gauge',
            },
            yAxis: {
                currentMin: 0,
                currentMax: 20,
                title: {
                    y: 140
                },
                stops: [
                        [0.1, '#DF5353'], // red
                  [0.5, '#DDDF0D'], // yellow
                  [0.9, '#55BF3B'] // green
           ],
                lineWidth: 0,
                tickInterval: 20,
                tickPixelInterval: 400,
                tickWidth: 0,
                labels: {
                    y: 15
                }
            },
            loading: false
        }
    }]);


    app.factory('pinFactory', function () {
        return {
            id: 3,
            pins: {}
        };
    });
})();