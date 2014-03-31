'use strict';
angular.module('strangelove', [
    'ngRoute',
    'ngGrid',
    'strangelove.controllers'
]).config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/devices', {templateUrl: 'partials/devices.html', controller: 'devices'});
        $routeProvider.when('/servers', {templateUrl: 'partials/servers.html', controller: 'servers'});
        $routeProvider.when('/users', {templateUrl: 'partials/users.html', controller: 'users'});
        $routeProvider.when('/payments', {templateUrl: 'partials/payments.html', controller: 'payments'});
        $routeProvider.otherwise({redirectTo: '/devices'});
    }]);
