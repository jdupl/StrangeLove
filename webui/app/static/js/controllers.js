'use strict';

/* Controllers */

angular.module('strangelove.controllers', []).
        controller('devices', function($scope, $http) {

            $scope.mySelections = [];
            $scope.devices = [];

            $scope.gridOptions = {
                data: 'devices',
                columnDefs: [
                    {field: 'id', displayName: 'Id Gpu'},
                    {field: 'model', displayName: 'Modèle de GPU'},
                    {field: 'hashrate', displayName: 'Hashrate'},
                    {field: 'validShares', displayName: 'Shares acceptés'},
                    {field: 'invalidShares', displayName: 'Shares refusés'}
                ],
                selectedItems: $scope.mySelections,
                multiSelect: false
            };
            $scope.getTableStyle = function() {
                var rowHeight = 30;
                var headerHeight = 45;
                return {
                    height: ($scope.devices.length * rowHeight + headerHeight) + "px"
                };
            };

            function refresh() {
                 $http({method: 'GET', url: 'http://localhost:3000/summary/1394472905'})
                     .success(function(data, status, headers, config) {
                            $scope.devices = data.devices;
                            console.log("success");
                     })
                     .error(function(data, status, headers, config) {
                            console.log(JSON.stringify(status));
                            console.log(JSON.stringify(data));
                            console.log("erreur");
                     });
            }
            
            refresh();
        })
        .controller('servers', function($scope) {

            $scope.mySelections = [];

            $scope.servers = [
                {'id': '1', 'uptime': '15 jours 7 heures', 'admin': 'Justin', 'freeSlots': '0'}
            ];

            $scope.gridOptions = {
                data: 'servers',
                columnDefs: [
                    {field: 'id', displayName: 'Id serveur'},
                    {field: 'uptime', displayName: 'Uptime'},
                    {field: 'admin', displayName: 'Admin Responsable'},
                    {field: 'freeSlots', displayName: 'Ports libres'}
                ],
                selectedItems: $scope.mySelections,
                multiSelect: false
            };
            $scope.getTableStyle = function() {
                var rowHeight = 30;
                var headerHeight = 45;
                return {
                    height: ($scope.servers.length * rowHeight + headerHeight) + "px"
                };
            };
        })
        .controller('HeaderController', function($scope, $location) {
            $scope.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            };
        });
