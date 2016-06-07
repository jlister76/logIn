(function(){
  'use strict';

  angular
    .module('logInApp')
    .factory('AuthService', function (Employee, $q, $rootScope) {
      function login(email, password) {
        return Employee
          .login({email: email, password: password})
          .$promise
          .then(function (response) {

            /*$rootScope.currentUser = {
             id: response.user.id,
             tokenId: response.id,
             email: email
             };*/
          });
      }

      function logout() {
        return Employee
          .logout()
          .$promise
          .then(function () {
            $rootScope.currentUser = null;

          });
      }

      function register(email, password) {
        return Employee
          .create({
            email: email,
            password: password
          })
          .$promise
      }

      function getCurrent() {
        return Employee
          .getCurrent()
      }

      function getCurrentId() {
        return Employee
          .getCurrentId()

      }

      function isAuthenticated() {
        return Employee.isAuthenticated;
      }


      return {
        login: login,
        logout: logout,
        register: register,
        getCurrent: getCurrent,
        getCurrentId: getCurrentId,
        isAuthenticated: isAuthenticated
      };
    })
})();
