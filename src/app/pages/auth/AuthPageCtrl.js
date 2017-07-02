/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth')
      .controller('RegisterPageCtrl', RegisterPageCtrl)
      .controller('LoginPageCtrl', LoginPageCtrl);

  /** @ngInject */
  function RegisterPageCtrl($scope, $filter, $rootScope) {
  }

  function LoginPageCtrl($scope, $rootScope, $state, $localStorage) {
  	$scope.login = function (){
  		$localStorage.token = "lalala";
  		$state.go('dashboard');
  	}
  }

})();
