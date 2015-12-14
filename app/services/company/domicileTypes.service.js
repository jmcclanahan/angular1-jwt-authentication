'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.service:DomicileTypesService
 * @description
 * # DomicileTypesService
 * Service of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
  .factory('DomicileTypesService', function(Restangular){
    return {
      domicileTypesByState: function(stateId) {
        // GET /domicile_types/byState/1
        return Restangular.all('domicile_types').one('byState', stateId).getList().$object;
      },
      domicileTypesById: function(domicileTypeId) {
        //return Restangular.all('companies').one('byId', companyId).get().$object;
      }
    };
  });
