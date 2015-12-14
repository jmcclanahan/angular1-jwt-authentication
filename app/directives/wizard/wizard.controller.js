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
     wizardCtrl.index = 0;
     wizardCtrl.previousDisabled = true;
     wizardCtrl.finishDisabled = true;
     wizardCtrl.currentView = wizardCtrl.parent.views.data[wizardCtrl.index];

     wizardCtrl.isFormValid = function(formName) {
       $scope.$broadcast('show-errors-check-validity');
       wizardCtrl.form = $scope.$eval(formName);
       wizardCtrl.form.$submitted = true;
       if (wizardCtrl.form.$invalid) {
         return false;
       } else {
         return true;
       }
     }

     wizardCtrl.setCurrentView = function(view, formName) {
       //check form validity
       if (!wizardCtrl.isFormValid(formName)) { return; };
       
       if (wizardCtrl.form.$submitted === true) {
         wizardCtrl.form.$submitted = false;
       }

       //set the view you came from to inactive
       wizardCtrl.parent.views.data[wizardCtrl.index].active = false;

       //set the new active view
       wizardCtrl.index = wizardCtrl.parent.views.data.indexOf(view);
       wizardCtrl.currentView = view;
       wizardCtrl.currentView.active = true;

       //check if first step, if so disable the previous button
       wizardCtrl.disablePrevious();
     };

     wizardCtrl.next = function(formName) {
       //check form validity
       if (!wizardCtrl.isFormValid(formName)) { return; };

       //set the current view to inactive
       wizardCtrl.parent.views.data[wizardCtrl.index].active = false;

       //set the next step to active
       wizardCtrl.index++;
       wizardCtrl.currentView = wizardCtrl.parent.views.data[wizardCtrl.index];
       wizardCtrl.currentView.disabled = false;
       wizardCtrl.currentView.active = true;
       wizardCtrl.form.$submitted = false;

       //check if first step, if so disable the previous button
       wizardCtrl.disablePrevious();

       //if it is the final step, enable the finish button
       if (wizardCtrl.index === (wizardCtrl.parent.views.data.length - 1)) {
         wizardCtrl.finishDisabled = false;
       }
     };

     wizardCtrl.previous = function() {
       //set the current view to inactive
       wizardCtrl.parent.views.data[wizardCtrl.index].active = false;

       //set the previous step to active
       wizardCtrl.index--;
       wizardCtrl.currentView = wizardCtrl.parent.views.data[wizardCtrl.index];
       wizardCtrl.currentView.active = true;

       //check if first step, if so disable the previous button
       wizardCtrl.disablePrevious();
     }

     wizardCtrl.disablePrevious = function() {
       if (wizardCtrl.index === 0) {
         wizardCtrl.previousDisabled = true;
       } else {
         wizardCtrl.previousDisabled = false;
       }
     }
   });
