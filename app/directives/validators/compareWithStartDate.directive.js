'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.validator:DateBefore
 * @description
 * # DateBefore
 * Validator of the solarFrontendApp
 */
angular.module('solarFrontendApp')
  .directive('compareWithStartDate', function() {
    return {
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModel) {
        ngModel.$validators.dateBefore = function(modelValue) {
          var startDate = Date.parse($attrs.startDate);
          var endDate = Date.parse(modelValue);
          console.log('startDate', startDate);
          console.log('endDate', endDate);
          if (endDate && startDate) {
            return endDate >= startDate;
          } else {
            return true;
          }
        }
      }
    }
  });
