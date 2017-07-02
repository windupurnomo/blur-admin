/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($timeout, $rootScope, $state, $localStorage, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings) {
    var whatToWait = [
      preloader.loadAmCharts(),
      $timeout(3000)
    ];

    var theme = themeLayoutSettings;
    if (theme.blur) {
      if (theme.mobile) {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-mobile.jpg'));
      } else {
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg.jpg'));
        whatToWait.unshift(preloader.loadImg(layoutPaths.images.root + 'blur-bg-blurred.jpg'));
      }
    }

    $q.all(whatToWait).then(function () {
      $rootScope.$pageFinishedLoading = true;
    });

    $timeout(function () {
      if (!$rootScope.$pageFinishedLoading) {
        $rootScope.$pageFinishedLoading = true;
      }
    }, 2000);

    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
      var fullpages = ['login', 'register', 'forgotpassword'];
      var isFullPage = fullpages.indexOf(to.name) > -1;
      $rootScope.$baSidebarService.setVisible(!isFullPage);
      console.log($localStorage.token);
      if (!isFullPage && $localStorage.token === undefined){
        //cek token
        $state.go('login');
      }
    });

    $rootScope.$baSidebarService = baSidebarService;
  }

})();