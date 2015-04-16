angular.module('starter.controllers')

  .controller('PlaylistsCtrl', function ($scope, $http, $rootScope, $ionicLoading, $ionicHistory) {

    $ionicHistory.clearHistory();

    $scope.show = function () {
      if (hasBackend)
        $ionicLoading.show({
          template: 'Loading...'
        });
    };
    $scope.hide = function () {
      $ionicLoading.hide();
    };


    function loadFeed() {
      $scope.show();
      console.log('loading feed');
      $http
        .jsonp($rootScope.backEnd + 'lifehack_controller/lifehacks?callback=JSON_CALLBACK')
        .success(function (data, status, headers, config) {
          $ionicLoading.hide();
          //$filter("date")(data.created_date, 'dd.MM.yyyy HH:mm');
          $scope.knowhowList = data;
        })
        .error(function (data, status, headers, config) {
          if (hasBackend) {
            console.log(data + 'data', status + 'status', headers + 'headers', config + 'config', 'server is not responding');
          }
        }).finally(function () {
          // Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
    }

    loadFeed();
    $scope.like = function (knowhow_id) {
      var request = $http({
        method: "PUT",
        url: $rootScope.backEnd + 'like_controller/like?callback=JSON_CALLBACK',
        data: {
          knowhow_id: knowhow_id,
          user_token: "8548029d1f56ca3444705d9ace96c48a1415c184a6857887964a941b27b0aec0"
        }
      });

      // Store the data-dump of the FORM scope.
      request.success(
        function (html) {
          console.log('liked');
          //     angular.forEach($scope.playlists, function())
          $scope.knowhowList[knowhow_id].like_count++;
        }
      ).finally(function () {
        });
    };

    $scope.doRefresh = loadFeed;
  })