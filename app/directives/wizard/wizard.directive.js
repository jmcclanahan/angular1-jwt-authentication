'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.directive:Wizard
 * @description
 * # Wizard
 * Directive of the solarFrontendApp
 */
angular.module('solarFrontendApp')
  .directive('wizard', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/wizard/wizardTemplate.html',
      controller: 'WizardCtrl',
      controllerAs: 'wizardCtrl',
      bindToController: true
    };
  });
