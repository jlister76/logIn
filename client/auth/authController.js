(function(){
  'use strict';

  angular
    .module('logInApp')
    .controller('AuthLoginController', function ($scope, $state, AuthService, $location, $log) {

      $scope.user = {
        email: null,
        password: null
      };

      $scope.login = function () {
        AuthService.login($scope.user.email, $scope.user.password)
          .then(function () {
          //remembers path and returns to path after sign in
            var next = $location.nextAfterLogin || '/';
            $location.nextAfterLogin = null;
            $location.path(next);

            //store user in local storage or session storage
            //sessionStorage.setItem('key', 'value')
            //     OR
            //localStorage.setItem('key', 'value')
            //Route to main state
            $state.go('main'); //After login error this state transition ensures login() runs on first click

          })
          .catch(function(e){
            if (e) {
              console.error(e);
              //Display error on login
              $scope.err = e;
            }
          })
      };
    })
    .controller('AuthLogoutController', function ($scope, $state, AuthService) {

      AuthService.logout()
        .then(function () {
          //clear values in Webstorage
          //sessionStorage.clear();
          //     OR
          //localStorage.clear();

          $state.go('login');
        });
    })
    .controller('AuthSignUpController', function ($scope, $state, AuthService) {

      $scope.Employee = {
        email: 'baz@qux.com',
        password: 'bazqux'
      };

      $scope.register = function () {
        AuthService.register(email, password)
          .then(function () {
            $state.transitionTo('sign-up-success');
          });
      };
    })
})();
