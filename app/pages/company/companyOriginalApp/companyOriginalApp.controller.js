'use strict';

/**
 * @ngdoc function
 * @name companyOriginalApp.controller:companyOriginalAppCtrl
 * @description
 * # companyOriginalAppCtrl
 * Controller of the companyOriginalApp
 */
 angular.module('companyOriginalApp')
   .controller('CompanyOrigAppCtrl', function($scope, $state, CompaniesService, DomicileTypesService, CompanyTypesService,
      LineTypesService, HomeService, ipCookie) {
     var companyOrigAppCtrl = this;
     companyOrigAppCtrl.statesList = HomeService.statesList();
     companyOrigAppCtrl.countriesList = HomeService.countriesList();
     companyOrigAppCtrl.domicileTypesList = DomicileTypesService.domicileTypesByState(ipCookie('state'));
     companyOrigAppCtrl.companyTypesList = CompanyTypesService.companyTypesByState(ipCookie('state'));
     companyOrigAppCtrl.lineTypesList = LineTypesService.lineTypesByState(ipCookie('state'));
     companyOrigAppCtrl.formName = "companyForm";
     companyOrigAppCtrl.data = {
       company: {},
       company_authority: {},
       lobs: []
     };

     companyOrigAppCtrl.steps = {
       data: [{
         name: 'Demographics',
         url: 'pages/company/templates/demographics/companyDemographicsEditable.html'
       }, {
         name: 'Company Types',
         url: 'pages/company/templates/companyTypes/companyTypesEditable.html'
       }, {
         name: 'Line of Business',
         url: 'pages/company/templates/lineOfBusiness/lineOfBusinessEditable.html'
       }]
     };

     companyOrigAppCtrl.finish = function() {
       console.log('company', companyOrigAppCtrl.data);
       CompaniesService.saveCompany(companyOrigAppCtrl.data);
     }
   });
