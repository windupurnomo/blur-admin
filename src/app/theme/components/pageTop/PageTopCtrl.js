/**
 * @author windupurnomo
 * created on 02.07.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('PageTopCtrl', pageTopCtrl);

  /** @ngInject */
  function pageTopCtrl($scope, $state, $localStorage) {
    $scope.signout = function (){
      delete $localStorage.token;
      $state.go('login');
    }
  }

})();