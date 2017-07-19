/**
 * @author windupurnomo
 * created on 4/07/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.employee', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('setting.employee', {
        url: '/employee',
        templateUrl: 'app/pages/setting/employee/employee.html',
        title: 'Pegawai',
        controller: 'EmployeePageCtrl',
        sidebarMeta: {
          icon: 'ion-ios-pulse',
          order: 0,
        },
      });
  }
})();