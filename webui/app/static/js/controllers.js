'use strict';

/* Controllers */

angular.module('strangelove.controllers', []).
        controller('devices', function($scope) {

            $scope.mySelections = [];

            $scope.devices = [
                {'id': '1', 'model': 'R9 270x', 'hashrate': '470', 'validShares': '1500', 'invalidShares': '10', 'owners': [{'name': 'Justin', 'share': '100%'}]},
                {'id': '2', 'model': 'R9 280x', 'hashrate': '760', 'validShares': '3500', 'invalidShares': '15', 'owners': [{'name': 'Félix', 'share': '25%'}, {'name': 'Maxime', 'share': '25%'}, {'name': 'Simon', 'share': '25%'}, {'name': 'Guillaume', 'share': '25%'}]}
            ];

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
