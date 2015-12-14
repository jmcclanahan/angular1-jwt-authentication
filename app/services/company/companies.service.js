'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.service:CompaniesService
 * @description
 * # CompaniesService
 * Service of the solarFrontendApp
 */
 angular.module('solarFrontendApp')
  .factory('CompaniesService', function(Restangular, $state, growl){
    return {
      companiesByState: function(stateId) {
        // GET /companies/byState/1
        return Restangular.all('companies').one('byState', stateId).getList().$object;
      },
      companyById: function(companyId) {
        // GET /companies/byId/1
        return Restangular.all('companies').one('byId', companyId).get().$object;
      },
      companySearch: function(searchCriteria) {
        // GET /copmanies/search
        return Restangular.all('companies').one('search').customPUT(searchCriteria);
      },
      saveCompany: function(company) {
        Restangular.all('companies').post(company).then(function(response) {
          var config = {};
          growl.success("Company: <b>" + response.name + "</b> with Company #: <b>" + response.id + "</b> has successfully been created! Click Here for Summary.", config);
          $state.go('home');
        }, function(response) {});
      }
    };
  });
