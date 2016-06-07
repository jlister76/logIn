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
          .catch(function(e){
            if (e) {
              console.error(e);
              $scope.err = e;
            }
          })
          .then(function () {

            var next = $location.nextAfterLogin || '/';
            $location.nextAfterLogin = null;
            $location.path(next);
            $state.go('main');
          })
      };
    })
    .controller('AuthLogoutController', function ($scope, $state, AuthService) {

      AuthService.logout()
        .then(function () {
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
