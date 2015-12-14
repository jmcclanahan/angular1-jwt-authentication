'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
   .controller('HomeCtrl', function($scope, $auth, $state, ipCookie, HomeService, growl) {
     var homeCtrl = this;
     homeCtrl.selectedState = HomeService.getSelectedState();
     homeCtrl.states = HomeService.statesList();

     homeCtrl.setSelectedState = function(selectedState) {
       HomeService.setSelectedState(selectedState);
     };

     homeCtrl.handleSignOut = function() {
       $auth.signOut()
         .then(function(resp) {
           ipCookie.remove("state");
           $state.go('login');
         })
         .catch(function(resp) {
           //handle error response
         });
     };

   });
