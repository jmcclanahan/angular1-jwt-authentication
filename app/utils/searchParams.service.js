'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.service:HomeService
 * @description
 * # HomeService
 * Service of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
   .factory('SearchParamsService', function($location) {
     return {
       append: function(object) {
         for (var property in object) {
           if (object.hasOwnProperty(property)) {
               if (object[property] !== "") {
                 $location.search(property, object[property]);
               } else {
                 $location.search(property, null);
               }
           }
         }
         return $location.search();
       }
     };
   });
