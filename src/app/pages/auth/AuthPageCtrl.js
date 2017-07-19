/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.auth')
      .controller('RegisterPageCtrl', RegisterPageCtrl)
      .controller('VerificationPageCtrl', VerificationPageCtrl)
      .controller('LoginPageCtrl', LoginPageCtrl);

  var userPool;

  function getUserPool (cognito){
    if (userPool == null){
      var poolData = {
          UserPoolId : cognito.poolId, // Your user pool id here
          ClientId : cognito.clientId // Your client id here
      };
      userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
      return userPool;
    }
    else return userPool;
  }

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function (c){
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    })
  }

  /** @ngInject */
  function RegisterPageCtrl($scope, $state, aws) {
    $scope.form = {};
    $scope.register = function (){
      aws.signup($scope.form.email, $scope.form.name, '10', uuidv4(), 
        $scope.form.username, $scope.form.password, function(err, result){
          if (err) {
            log(err);
            alert(err);
            return;
          }
          var cognitoUser = result.user;
          $state.go('verification');
      });
    }
  }

  function VerificationPageCtrl ($scope, $state, aws){
    $scope.form = {};
    $scope.verify = function (){
      var userData = {
          Username : $scope.form.username,
          Pool : aws.userPool
      };

      var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      cognitoUser.confirmRegistration($scope.form.code, true, function(err, result) {
          if (err) {
              alert(err);
              return;
          }
          log('call result: ' + result);
          $state.go('login');
      });
    }
  }

  function LoginPageCtrl($scope, $rootScope, $state, $localStorage, aws, cognito) {
    $scope.form = {};
  	$scope.login = function (){
      var authenticationData = {
          Username : $scope.form.username,
          Password : $scope.form.password,
      };
      var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
      
      var userData = {
          Username : $scope.form.username,
          Pool : aws.userPool
      };
      var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              var xxx = 'cognito-idp.' + cognito.region + '.amazonaws.com/' + cognito.poolId;
              //POTENTIAL: Region needs to be set if not already set previously elsewhere.
              // AWS.config.region = cognito.region;
              // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              //     IdentityPoolId : cognito.poolId, // your identity pool id here
              //     Logins : {
              //         // Change the key below according to the specific region your user pool is in.
              //         xxx : result.getIdToken().getJwtToken()
              //     }
              // });
              cognitoUser.getUserAttributes(function(err, result) {
                  if (err) {
                      alert(err);
                      return;
                  }
                  var user = {};
                  for (var i = 0; i < result.length; i++) {
                      user[result[i].getName()] = result[i].getValue();
                  }
                  $localStorage.user = user;
              });
              $localStorage.token = result.getIdToken().getJwtToken();
              $state.go('dashboard');

          },

          onFailure: function(err) {
              alert(err);
          },

      });
  	}
  }

  function log(message){
    console.log(message);
  }

})();
