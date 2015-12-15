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
        $scope.showUpdate = false;

        $scope.lobGridOptions.columnDefs = [
          { name: 'lobType.line_type_desc', displayName: 'Line of Business', width: '60%' },
          { name: 'effective_date', displayName: 'Effective Date', type: 'date', cellFilter: 'date:\'MM/dd/yyyy\'', width: '32%' },
          { name: 'Edit', displayName: '', enableSorting: false,
            cellTemplate: '<button class="btn btn-primary" ng-click="grid.appScope.lob = row.entity; grid.appScope.showUpdate = true"><i class="glyphicon glyphicon-pencil"></i></button>', width: '4%' },
          { name: 'Delete', displayName: '', enableSorting: false,
            cellTemplate: '<button class="btn btn-danger" ng-click="grid.appScope.removeLob(row.entity)"><i class="glyphicon glyphicon-trash"></i></button>', width: '4%' }
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
          $scope.lob = {};
        }

        $scope.removeLob = function(lobToRemove) {
          var index = $scope.lobGridOptions.data.indexOf(lobToRemove);
          $scope.lobGridOptions.data.splice(index, 1);
          $scope.lobs.splice(index, 1);
        }

        $scope.updateLob = function() {
          var index = $scope.lobGridOptions.data.indexOf($scope.lob);
          $scope.lobGridOptions.data[index] = $scope.lob;
          $scope.lobs[index] = {
            line_type_id: $scope.lob.lobType.id,
            effective_date: $scope.lob.effective_date
          };
          $scope.lob = {};
        }
      },
      link: function(scope, element, attrs, formCtrl) {
        scope.form = formCtrl;
      }
    };
  });
