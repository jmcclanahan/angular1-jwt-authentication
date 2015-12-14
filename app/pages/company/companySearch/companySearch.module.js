'use strict';

/**
 * @ngdoc overview
 * @name companySearch
 * @description
 * # companySearch
 *
 * Module for Company Search.
 */
angular
  .module('companySearch', [
    'ui.router',
    'ngAnimate',
    'ipCookie',
    'ngSanitize',
    'ui.router',
    'restangular',
    'ui.bootstrap',
    'ui.utils',
    'ui.grid',
    'ui.select'
  ])
  .config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
      $stateProvider
        .state('home.companies', {
          url: 'companies',
          templateUrl: 'pages/company/companies.html',
          controller: 'CompaniesCtrl as companiesCtrl'
        })
        .state('home.companySearch', {
          url: 'companySearch',
          templateUrl: 'pages/company/companySearch/companySearch.html',
          controller: 'CompanySearchCtrl as companySearchCtrl'
        });
      });
