/**
 * Created by windupurnomo on 05.07.2017
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages')
    .service('appService', appService)
    .service('aws', awsFunction);

  /** @ngInject */
  function appService(){
    return {
      roles: [{code: '10', name: 'Manager'}, 
        {code: '11', name: 'Gudang'}, 
        {code: '12', name: 'Kasir'}
      ]
    }
  };

  function awsFunction(cognito) {
    var poolData = {
        UserPoolId : cognito.poolId, // Your user pool id here
        ClientId : cognito.clientId // Your client id here
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    return {
      userPool: userPool,
      signup: function (email, name, role, tenant, username, password, callback){
        var attributeList = [];

        var dataEmail = {
            Name : 'email',
            Value : email
        };

        var dataName = {
            Name : 'name',
            Value : name
        };

        var dataRole = {
            Name : 'custom:role',
            Value : role
        };

        var dataTenant = {
            Name : 'family_name',
            Value : tenant
        };

        var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
        var attributeName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataName);
        var attributeRole = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataRole);
        var attributeTenant = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataTenant);

        attributeList.push(attributeEmail);
        attributeList.push(attributeName);
        attributeList.push(attributeRole);
        attributeList.push(attributeTenant);

        userPool.signUp(username, password, attributeList, null, callback);
      }
    }
  }

})();