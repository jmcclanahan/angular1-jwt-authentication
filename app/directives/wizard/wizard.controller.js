'use strict';

/**
 * @ngdoc function
 * @name companyOriginalApp.controller:wizardCtrl
 * @description
 * # wizardCtrl
 * Controller of the wizard
 */
 angular.module('companyOriginalApp')
   .controller('WizardCtrl', function($scope, $attrs) {
     var wizardCtrl = this;
     wizardCtrl.parent = $scope.$eval($attrs.parent);
     wizardCtrl.steps = wizardCtrl.parent.steps.data;
     wizardCtrl.step = 0;

     wizardCtrl.isFormValid = function() {
       $scope.$broadcast('show-errors-check-validity');
       wizardCtrl.form = $scope.$eval(wizardCtrl.parent.formName);
       if (wizardCtrl.form.$invalid) {
         wizardCtrl.form.$submitted = true;
         return false;
       } else {
         wizardCtrl.form.$submitted = false;
         return true;
       }
     }

     wizardCtrl.isFirstStep = function() {
       return wizardCtrl.step === 0;
     }

     wizardCtrl.isLastStep = function() {
       return wizardCtrl.step === (wizardCtrl.steps.length - 1);
     }

     wizardCtrl.isCurrentStep = function(step) {
       return wizardCtrl.step === step;
     }

     wizardCtrl.setCurrentStep = function(step) {
       wizardCtrl.step = step;
     }

     wizardCtrl.getCurrentStep = function() {
       return wizardCtrl.steps[wizardCtrl.step];
     }

     wizardCtrl.handlePrevious = function() {
       //check form validity
       if (!wizardCtrl.isFormValid()) { return; };

       wizardCtrl.step -= (wizardCtrl.isFirstStep()) ? 0 : 1;
     }

     wizardCtrl.handleNext = function() {
       //check form validity
       if (!wizardCtrl.isFormValid()) { return; };

       wizardCtrl.step += 1;
     }
   });
