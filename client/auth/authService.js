(function(){
  'use strict';

  angular
    .module('logInApp')
    .factory('AuthService', function (User, $q, $rootScope) {
      function login(email, password) {
        return User
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
        return User
          .logout()
          .$promise
          .then(function () {
            $rootScope.currentUser = null;

          });
      }

      function register(email, password) {
        return User
          .create({
            email: email,
            password: password
          })
          .$promise
      }

      function getCurrent() {
        return User
          .getCurrent()
      }

      function getCurrentId() {
        return User
          .getCurrentId()

      }

      function isAuthenticated() {
        return User.isAuthenticated;
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
