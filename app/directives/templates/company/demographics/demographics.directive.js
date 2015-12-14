'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.directive:Demographics
 * @description
 * # Company Demographics
 * Directive of the solarFrontendApp
 */
angular.module('solarFrontendApp')
  .directive('companyDemographics', function() {
    return {
      restrict: 'E',
      require: '^form',
      templateUrl: 'directives/templates/company/demographics/companyDemographicsTemplate.html',
      scope: {
        company: '=',
        statesList: '=',
        countriesList: '=',
        domicileTypesList: '='
      },
      controller: function($scope) {
        $scope.calendarProperties = {
          opened: false
        }
      },
      link: function(scope, element, attrs, formCtrl) {
        scope.form = formCtrl;
      }
    };
  });
