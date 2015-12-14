'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.directive:LineOfBusiness
 * @description
 * # Company Line of Business
 * Directive of the solarFrontendApp
 */
angular.module('solarFrontendApp')
  .directive('lineOfBusiness', function() {
    return {
      restrict: 'E',
      require: '^form',
      templateUrl: 'directives/templates/company/lineOfBusiness/lineOfBusinessTemplate.html',
      scope: {
        lobs: '=',
        lineTypesList: '='
      },
      controller: function($scope) {
        $scope.lobGridOptions = {};
        $scope.lobs = [];
        $scope.lob = {};

        $scope.lobGridOptions.columnDefs = [
          { name: 'lobType.line_type_desc', displayName: 'Line of Business', width: '60%' },
          { name: 'effective_date', displayName: 'Effective Date', type: 'date', cellFilter: 'date:\'MM/dd/yyyy\'', width: '35%' }
        ];

        $scope.calendarProperties = {
          opened: false
        }

        $scope.addLob = function() {
          //ui-grid display
          $scope.lobGridOptions.data.push($scope.lob);

          //construct loa list to be passed to api
          $scope.lobs.push({
            line_type_id: $scope.lob.lobType.id,
            effective_date: $scope.lob.effective_date
          });

          //clear form
          $scope.lob = undefined;
        }
      },
      link: function(scope, element, attrs, formCtrl) {
        scope.form = formCtrl;
      }
    };
  });
