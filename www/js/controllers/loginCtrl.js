angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, $state, $stateParams, $location, $log, $rootScope, $http, $ionicViewService, serviceUrls, serverCall, sha256) {

    $scope.loginMe = function (user) {

      $scope.loading = true;
      $scope.login_error = false;

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

            $ionicViewService.nextViewOptions({
              disableBack: true
            });

            $rootScope.loggedin = true;
            $state.go('app.playlists');
//            $location.path('/app/playlists');
            $scope.loading = false;
            $scope.login_error = false;
          }
        }, function (data, status) {
          console.log(data)
          $scope.login_error = true;
          $scope.loading = false;
        });

    };
  });