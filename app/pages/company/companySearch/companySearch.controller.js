'use strict';

/**
 * @ngdoc function
 * @name solarFrontendApp.controller:CompanySearchCtrl
 * @description
 * # CompanySearchCtrl
 * Controller of the solarFrontendApp
 */
 angular.module('companySearch')
   .controller('CompanySearchCtrl', function($scope, $state, $location, SearchParamsService,
     CompaniesService, CompanyTypesService, ipCookie, uiGridConstants) {
    var companySearchCtrl = this;
    companySearchCtrl.companyTypesList = CompanyTypesService.companyTypesByState(ipCookie("state"));
    companySearchCtrl.gridOptions = {};

    companySearchCtrl.searchCriteria = {
      state_id: ipCookie('state')
    };

    companySearchCtrl.calendarProperties = {
      id: 'dateOfIncorp',
      label: 'Date of Incorporation',
      opened: false
    }

    companySearchCtrl.gridOptions.columnDefs = [
      { field: 'id', displayName: 'Company Number', width: '10%' },
      { field: 'name', displayName: 'Company Name', width: '25%',
        cellTemplate: '<div><a ui-sref="home.dashboard">{{row.entity[col.field]}}</a></div>'},
      { field: 'short_name', displayName: 'Short Name', width: '15%' },
      { field: 'fein', displayName: 'FEIN', width: '8%' },
      { field: 'state_desc', displayName: 'Domicile State', width: '8%' },
      { field: 'domicile_type_desc', displayName: 'Domicile Type', width: '8%' },
      { field: 'company_type_desc', displayName: 'Company Type', width: '26%',
        cellTemplate: '<div class="ui-grid-cell-contents wrap">{{row.entity[col.field]}}</div>'}
    ];

    companySearchCtrl.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
    //companySearchCtrl.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.NEVER;
    companySearchCtrl.gridOptions.rowHeight = 50;

    companySearchCtrl.search = function() {
      SearchParamsService.append(companySearchCtrl.searchCriteria);
      CompaniesService.companySearch(companySearchCtrl.searchCriteria).then(function(results) {
        companySearchCtrl.gridOptions.data = results.plain();
      });
    };

    if (Object.keys($location.search()).length > 0) {
      companySearchCtrl.searchCriteria = $location.search();
      companySearchCtrl.search();
    }
  });
