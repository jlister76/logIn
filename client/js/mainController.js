(function(){
  'use strict';
  angular
    .module('logInApp')
    .controller('MainController', function ($scope, AuthService, $rootScope, $state){

      //directs to log-in
      $scope.authenticated = AuthService.isAuthenticated();
      $scope.getCurrent = function () {
        AuthService.getCurrent()
          .$promise
          .then(function (user) {
            //console.info(user);
            $rootScope.currentUser = user;

          });

      };
      $scope.getCurrent();
    })
})();
