'use strict';

/**
 * @ngdoc overview
 * @name companyOriginalApp
 * @description
 * # companyOriginalApp
 *
 * Module for Company Original Application.
 */
angular
  .module('companyOriginalApp', [
    'ui.router',
    'ngAnimate',
    'ipCookie',
    'ngSanitize',
    'ui.router',
    'restangular',
    'ui.bootstrap',
    'ui.utils',
    'ui.grid',
    'ui.select',
    'ngMessages',
    'angular-growl'
  ])
  .config(function($stateProvider) {
    $stateProvider
      .state('home.companyOriginalApp', {
        url: 'companyOriginalApp',
        templateUrl: 'pages/company/companyOriginalApp/companyOriginalApp.html',
        controller: 'CompanyOrigAppCtrl as companyCtrl'
      });
  });
