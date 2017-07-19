/**
 * @author windupurnomo
 * created on 4/07/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.company', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('setting.company', {
        url: '/company',
        templateUrl: 'app/pages/setting/company/company.html',
        title: 'Company',
        sidebarMeta: {
          icon: 'ion-ios-pulse',
          order: 0,
        },
      });
  }
})();