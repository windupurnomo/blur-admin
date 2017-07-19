/**
 * @author windupurnomo
 * created on 4/07/2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.setting.employee')
    .controller("EmployeePageCtrl", EmployeePageCtrl)
    .controller("EmployeeFormCtrl", EmployeeFormCtrl);

  /** @ngInject */
  function EmployeePageCtrl($scope, aws, cognito, appService, $http, $uibModal, baProgressModal) {
    function getRoleName(code){
      for(var i in appService.roles){
        if (appService.roles[i].code === code) 
          return appService.roles[i].name;
      }
    }

  	function init(){
      $http.get('https://945jd9abck.execute-api.us-west-2.amazonaws.com/prod/employee').then(function (res){
        $scope.employees = res.data;
        for(var i in $scope.employees){
          var r = $scope.employees[i]['custom:role'];
          $scope.employees[i].role = getRoleName(r);
        }
      });
    }
    init();

    $scope.addEmployee = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/pages/setting/employee/employeeForm.html',
        size: 'md',
        controller: 'EmployeeFormCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (createdEmployee) {
        $scope.employees.push(createdEmployee);
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    };
  }

  function EmployeeFormCtrl($scope, $localStorage, appService, aws, $uibModalInstance){
    $scope.form = {};
    $scope.roles = appService.roles;
    $scope.saveEmployee = function (){
      aws.signup($scope.form.email, $scope.form.name, $scope.form.roleObj.code, $localStorage.user.family_name, 
        $scope.form.username, $scope.form.password, function(err, result){
          if (err) {
            log(err);
            alert(err);
            return;
          }
          var cognitoUser = result.user;
          var obj = angular.copy($scope.form);
          obj.role = obj.roleObj.name;
          $uibModalInstance.close(obj);
      });
    }
  }

})();