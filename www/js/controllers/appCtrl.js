angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })

  .controller('NoteController', function ($scope, CateoryFactory, $http, $rootScope, $ionicLoading, $ionicPopup, $timeout) {
    $scope.show = function () {
      $ionicLoading.show({
        template: 'Loading...'
      });
    };
    $scope.hide = function () {
      $ionicLoading.hide();
    };

    $scope.knowHow = {category_id: "1"};

    // An elaborate, custom popup
    function showPopup() {
      var myPopup = $ionicPopup.show({
        title: 'Успешно опубликован'
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }

    $http
      .jsonp($rootScope.backEnd + 'category_controller/categories?callback=JSON_CALLBACK')
      .success(function (data, status, headers, config) {
        $scope.categoryList = data;
      })
      .error(function (data, status, headers, config) {
        console.log('server is not responding')
      });
    // $scope.categoryList = CateoryFactory.get;

    $scope.createKnowHow = function () {
      $scope.show();
      var request = $http({
        method: "PUT",
        url: $rootScope.backEnd + 'lifehack_controller/lifehack?callback=JSON_CALLBACK',
        data: {
          category_id: $scope.knowHow.category_id,
          text: $scope.knowHow.text,
          user_token: "8548029d1f56ca3444705d9ace96c48a1415c184a6857887964a941b27b0aec0"
        }
      });

      // Store the data-dump of the FORM scope.
      request.success(
        function (html) {
          //        $scope.hide();
          $scope.knowHow.text = '';
          $scope.knowHow.category_id = '1';
          $scope.cfdump = html;
          showPopup();
        }
      ).finally(function () {
          $scope.hide();
        });
    };
  });