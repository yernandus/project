angular.module('starter.controllers')
.controller('SignupCtrl', function ($scope, $stateParams, $log, $location, $rootScope, $http, serviceUrls, serverCall, sha256) {
  $scope.signup = function (user) {
    $scope.email_conflict = false;

    var config = {
      method: 'PUT',
      url: serviceUrls.api_url + serviceUrls.signup,
      data: {
        email: user.email,
        password: sha256.encode(user.email),
        name: user.name
      }
    };

    serverCall
      .apiDataCall(config)
      .then(function (data, status) {
        console.log('Success : ', data);
        localStorage.setItem('user_token', data.user_token);
        $location.path('/app/playlists')
      }, function (data, status) {
        console.log('Error : ', data);
        if(data.status == "email_not_available"){
          $scope.email_conflict = true;
        }
      });

  };
})