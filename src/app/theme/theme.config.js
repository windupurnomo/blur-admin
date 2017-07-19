/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .config(config);

  /** @ngInject */
  function config(baConfigProvider, colorHelper, $provide, $httpProvider) {
    $provide.decorator('$uiViewScroll', uiViewScrollDecorator);
    //baConfigProvider.changeTheme({blur: true});
    //
    //baConfigProvider.changeColors({
    //  default: 'rgba(#000000, 0.2)',
    //  defaultText: '#ffffff',
    //  dashboard: {
    //    white: '#ffffff',
    //  },
    //});

    $httpProvider.interceptors.push(function($q, $location, $localStorage) {
      return {
        'request': function(config) {
            config.headers = config.headers || {};
            var token = $localStorage.token;
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
        'responseError': function(response) {
            console.log(response);
            if (response.status === 401 || response.status === 403) {
                $rootScope.$emit('loginRequired');
            } else if (response.status === 500 && response.data !== null &&
                response.data.statusMessage &&
                response.data.statusMessage.indexOf("Session token authentication failure") > -1) {
                $rootScope.$emit('loginRequired');
            }
            return $q.reject(response);
        }
      };
    });
  }

  /** @ngInject */
  function uiViewScrollDecorator($delegate, $anchorScroll, baUtil) {
    return function (uiViewElement) {
      if (baUtil.hasAttr(uiViewElement, "autoscroll-body-top")) {
        $anchorScroll();
      } else {
        $delegate(uiViewElement);
      }
    };
  }
})();
