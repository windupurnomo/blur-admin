/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('login', {
          url: '/login',
          title: 'Login',
          templateUrl: 'app/pages/auth/login.html',
          controller: 'LoginPageCtrl'
        })
        .state('register', {
          url: '/register',
          title: 'Register',
          templateUrl: 'app/pages/auth/register.html',
          controller: 'RegisterPageCtrl',
        })
        .state('verification', {
          url: '/verification',
          title: 'Verification',
          templateUrl: 'app/pages/auth/verification.html',
          controller: 'VerificationPageCtrl',
        })
    ;
  }

})();
