'use strict';

/**
 * @ngdoc overview
 * @name solarFrontendApp
 * @description
 * # solarFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('solarFrontendApp', [
    'companySearch',
    'companyOriginalApp',
    'ui.router',
    'ng-token-auth'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, growlProvider, RestangularProvider) {
    //global growl notifications
    $httpProvider.interceptors.push(growlProvider.serverMessagesInterceptor);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'pages/user/login.html',
        controller: 'UserSessionsCtrl as userSessionsCtrl'
      })
      .state('home', {
        url: '/',
        templateUrl: 'pages/home/home.html',
        controller: 'HomeCtrl as homeCtrl',
        resolve: {
          auth: authenticateRoute
        }
      })
      .state('home.dashboard', {
        url: 'dashboard',
        templateUrl: 'pages/home/dashboard.html'
      });

    $urlRouterProvider.otherwise('/');

    function authenticateRoute($auth, $state) {
      return $auth.validateUser()
        .catch(function(res) {
          $state.go('login');
        });
    }

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRequestSuffix('.json');


    //RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    // if (what === 'byState') {
    //   console.log("Returning companies by state", data.companies);
    //   return data.companies;
    // } else if (what === 'byId') {
    //   console.log("Returning company by Id", data.company);
    // } else {
    //   console.log("Returning default", data);
    //   return data;
    // }
    //return data;
    //});

  })
  .run(function($rootScope, $state) {
    $rootScope.$on('auth:login-success', function() {
      $state.go('home.dashboard');
    });
  });
