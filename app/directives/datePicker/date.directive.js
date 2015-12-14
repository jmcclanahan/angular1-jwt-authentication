'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.controller:CompanySearchCtrl
 * @description
 * # CompanySearchCtrl
 * Controller of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
  .directive('dateInput', function () {
    return {
      restrict: 'E',
      templateUrl: 'directives/datePicker/dateTemplate.html',
      scope: {
        ngModel: '=',
        minDate: '=',
        maxDate: '=',
        isRequired: '=',
        dateId: '@',
        name: '@',
        dateLabel: '@'
      },
      link: function(scope, element, attrs) {
        scope.formats = ['MM/dd/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        scope.format = scope.formats[0];
        scope.opened = false;

        scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        scope.open = function($event) {
          scope.opened = true;
        };

        /**
         * If this date is entered before min date
         * and the min date entered is after this date
         * then reset this date
         */
        scope.$watch('minDate', function(newMinDate) {
          if (scope.ngModel < newMinDate) {
            scope.ngModel = null;
          }
        });
      }
    };
  });
