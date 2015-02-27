(function () {
    var app = angular.module('arduino', ['angular.filter', 'highcharts-ng', 'ui.bootstrap']);

    app.controller('addPinController', ['pinFactory', 'socket', function (pinFactory, socket) {

        socket.on('test', function (data) {
            console.log(data);
        });

        var that = this;
        this.pins = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.type = ["Digital Write", "Digital Read"]

        this.selectClass = function () {
            if (that.selectedPin && that.selectedType) {
                return false;
            }
            return true;
        }

        this.addPin = function () {
            socket.emit('new pin', that.selectedPin, function (state) {
                console.log("log" + state);
                pinFactory.pins[that.selectedPin] = {
                    pin: that.selectedPin,
                    status: state,
                    type: that.selectedType,
                    id: ++pinFactory.id
                };
            });
        };
    }]);

    app.controller('pinController', ['pinFactory', 'socket', function (pinFactory, socket) {
        this.pins = pinFactory.pins;

        this.selectClass = function (pin) {
            if (pin.status) {
                return "btn-success";
            };
            return "btn-danger btn-disabled";
        }

        this.toggle = function (pin) {
            //            pin.status = pin.status * (-1) + 1;
            socket.emit('digitalWrite', pin.pin);
        };

        this.count = function () {
            return Object.keys(this.pins).length;
        }
    }]);

    app.controller('highchartsController', ['$scope', 'pinFactory', function ($scope, pinFactory) {

        var that = this;
        this.init = function (pin) {
            that.pin = pin;

            $scope.$watch(function () {
                return that.pin.status;
            }, function (newValue, oldValue) {
                if (that.solidGaugeSmall.getHighcharts().series[0]) {
                    var chart = that.solidGaugeSmall.getHighcharts();
                    var point = chart.series[0].points[0];
                    point.update(newValue);
                }
            });
        }

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

    app.factory('pinFactory', ['socket', function (socket) {
        var pinFactory = {
            id: 0,
            pins: {}
        }

        socket.on('digital:change', function (data) {
            console.log(data);
            if (pinFactory.pins[data.pin]) {
                pinFactory.pins[data.pin].status = data.status;
            };
        });

        return pinFactory;
    }]);

    app.factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    });

})();