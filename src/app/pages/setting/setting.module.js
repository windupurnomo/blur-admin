/**
 * @author windupurnomo
 * created on 15.01.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting', [
    'BlurAdmin.pages.setting.employee',
    'BlurAdmin.pages.setting.company'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('setting', {
          url: '/setting',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Setting',
          sidebarMeta: {
            icon: 'ion-gear-a',
            order: 1,
          },
        });
  }

})();
