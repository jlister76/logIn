(function(){
  'use strict';
  angular
    .module('logInApp')
    .controller('MainController', function ($scope, AuthService, $rootScope, $state, $http){

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

      //Get OS data from user
      $http.get('api/employees/os').success(function(os){$scope.os = os.OSystem; console.log(os.OSystem);});
      $http.get('api/employees/dir').success(function(f){$scope.files = f.Dirs; console.info($scope.files)})

    })
})();
