'use strict';

angular.module('solarFrontendApp')
  .controller('UserSessionsCtrl', ['$scope', function($scope) {
    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = reason.errors[0];
    });
  }]);
