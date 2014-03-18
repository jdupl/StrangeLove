'use strict';

/* Controllers */

angular.module('strangelove.controllers', []).
        controller('devices', function($scope) {
            $scope.devices = [
                {'name': 'carte1', 'hashrate': '120'},
                {'name': 'carte2', 'hashrate': '150'},
                {'name': 'carte3', 'hashrate': '20'},
                {'name': 'carte4', 'hashrate': '0'},
                {'name': 'carte5', 'hashrate': '1'},
                {'name': 'carte6', 'hashrate': '10'},
                {'name': 'carte7', 'hashrate': '50'},
                {'name': 'carte8', 'hashrate': '12'}
            ];
            $scope.gridOptions = {
                data: 'devices',
                columnDefs: [{field: 'name', displayName: 'Name'}, {field: 'hashrate', displayName: 'Hashrate'}],
                multiSelect: false
            };
            $scope.getTableStyle = function() {
                var rowHeight = 30;
                var headerHeight = 45;
                return {
                    height: ($scope.devices.length * rowHeight + headerHeight) + "px"
                };
            };
        })
        .controller('HeaderController', function($scope, $location) {
            $scope.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            };
        });
