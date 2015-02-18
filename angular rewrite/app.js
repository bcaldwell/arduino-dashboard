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
            pin.status = pin.status * (-1) + 1;
        };

        this.count = function () {
            return Object.keys(this.pins).length;
        }
    }]);

    app.controller('highchartsController', ['pinFactory', function (pinFactory) {
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
            },
            series: [{
                name: 'boo',
                data: [1],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:20px;color:' +
                        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span></div>'
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
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' + ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span></div>'
                }
        }],
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            loading: false
        }
    }]);

    app.factory('pinFactory', function () {
        return {
            id: 0,
            pins: {
                1: {
                    pin: 4,
                    status: false,
                    type: "Digital Read",
                    id: 1
                }
            }
        };
    });
})();