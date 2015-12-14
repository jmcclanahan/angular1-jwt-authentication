'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.service:lineTypesService
 * @description
 * # lineTypesService
 * Service of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
  .factory('LineTypesService', function(Restangular){
    return {
      lineTypesByState: function(stateId) {
        // GET /line_types/byState/1
        return Restangular.all('line_types').one('byState', stateId).getList().$object;
      },
      lineTypesById: function(lineTypeId) {
        //return Restangular.all('companies').one('byId', lineId).get().$object;
      }
    };
  });
