angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $stateParams, $location, $log, $rootScope, $http, serviceUrls, serverCall, sha256) {

    $scope.loginMe = function (user) {

      var data = {
        email: user.email,
        password: sha256.encode(user.password)
      };

      var config = {
        method: 'POST',
        url: serviceUrls.api_url + serviceUrls.login,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: data
      };

      serverCall
        .apiDataCall(config)
        .then(function (data, status) {
          console.log(data);
          if (data.user_token) {
            localStorage.setItem('user_token', data.user_token);
            $location.path('/app/playlists');
          }
        }, function (data, status) {
          console.log(data)
        });

    };
  });