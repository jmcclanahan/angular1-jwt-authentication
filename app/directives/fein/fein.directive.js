'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.controller:CompanySearchCtrl
 * @description
 * # CompanySearchCtrl
 * Controller of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
  .directive('feinInput', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/fein/feinTemplate.html',
      scope: {
        ngModel: '='
      }
    };
  });
