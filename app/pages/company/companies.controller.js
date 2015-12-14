'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.controller:CompaniesCtrl
 * @description
 * # CompaniesCtrl
 * Controller of the solarFrontendApp
 */
 angular.module('companySearch')
  .controller('CompaniesCtrl', function($scope, CompaniesService, HomeService) {
    var companiesCtrl = this;
    companiesCtrl.selectedState = HomeService.getSelectedState();
    companiesCtrl.companies = CompaniesService.companiesByState(companiesCtrl.selectedState);
    //companiesCtrl.company = CompaniesService.companyById(selectedState);
  });
