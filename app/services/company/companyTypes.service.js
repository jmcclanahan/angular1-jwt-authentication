'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.service:CompanyTypesService
 * @description
 * # CompanyTypesService
 * Service of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
  .factory('CompanyTypesService', function(Restangular){
    return {
      companyTypesByState: function(stateId) {
        // GET /company_types/byState/1
        return Restangular.all('company_types').one('byState', stateId).getList().$object;
      },
      companyTypesById: function(companyTypeId) {
        //return Restangular.all('companies').one('byId', companyId).get().$object;
      }
    };
  });
