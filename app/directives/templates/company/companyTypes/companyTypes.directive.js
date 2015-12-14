'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.directive:CompanyTypes
 * @description
 * # Company Types
 * Directive of the solarFrontendApp
 */
angular.module('solarFrontendApp')
  .directive('companyTypes', function() {
    return {
      restrict: 'E',
      require: '^form',
      templateUrl: 'directives/templates/company/companyTypes/companyTypesTemplate.html',
      scope: {
        companyAuthority: '=',
        companyTypesList: '='
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
