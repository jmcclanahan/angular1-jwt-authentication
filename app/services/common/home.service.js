'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.service:HomeService
 * @description
 * # HomeService
 * Service of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
   .factory('HomeService', function(Restangular, ipCookie) {
     var selectedState;
     return {
       statesList: function() {
         return Restangular.all('states').getList().$object;
       },
       countriesList: function() {
         return Restangular.all('countries').getList().$object;
       },
       setSelectedState: function(state) {
         ipCookie('state', state);
       },
       getSelectedState: function() {
         return ipCookie('state');
       }
     };
   });
