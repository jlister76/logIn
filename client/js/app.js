(function () {
  'use strict';

  angular
    .module('logInApp',[
        'ui.router',
        'lbServices',
        'ngMaterial',
        'ngMessages'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      $stateProvider
        .state('main', {
          controller: 'MainController',
          url: '/main',
          templateUrl: '../views/main.html',
          authenticate: true
        })
        .state('forbidden', {
          url: '/forbidden',
          templateUrl: '../views/forbidden.html',
          authenticate: false
        })
        .state('login', {
          url: '/login',
          templateUrl: '../views/login.html',
          controller: 'AuthLoginController',
          authenticate: false
        })
        .state('logout', {
          url: '/logout',
          controller: 'AuthLogoutController',
          authenticate: true
        });
      $urlRouterProvider.otherwise('main');

      $httpProvider.interceptors.push(function ($q, $location, LoopBackAuth) {
        return {
          responseError: function (rejection) {
            if (rejection.status == 401) {
              //Now clearing the loopback values from client browser for safe logout...
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              $location.nextAfterLogin = $location.path();
              $location.path('login');
            }
            return $q.reject(rejection);
          }
        };
      })
    })
    .run(function ($rootScope, $state, AuthService) {
      //prevents loading views that require authentication
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.authenticate && !AuthService.getCurrentId()){
          // User isn’t authenticated
          $state.transitionTo('login');
          event.preventDefault();
        }
      });
    })
})();
