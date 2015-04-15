angular.module('starter.controllers')
.controller('LoginCtrl', function ($scope, $stateParams, $location, $log, $rootScope, $http, serviceUrls, serverCall, sha256) {

  $scope.loginMe = function (user) {

    var config = {
      method: 'PUT',
      url: serviceUrls.api_url + serviceUrls.login,
      data: {
        email: user.email,
        password: sha256.encode(user.email)
      }
    };

    serverCall
      .apiDataCall(config)
      .then(function (data, status) {
        console.log(data.user_token)
        localStorage.setItem('user_token', data.user_token);
        $location.path('/app/playlists')
      }, function (data, status) {
        console.log(data)
      });

  };
})