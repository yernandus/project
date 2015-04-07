angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('PlaylistsCtrl', function ($scope, $http, $rootScope, $ionicLoading) {

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

      $http
        .jsonp($rootScope.backEnd + 'knowhow_controller/knowhows?callback=JSON_CALLBACK')
        .success(function (data, status, headers, config) {
          $ionicLoading.hide();
          //$filter("date")(data.created_date, 'dd.MM.yyyy HH:mm');
          $scope.knowhowList = data;
        })
        .error(function (data, status, headers, config) {
          if (hasBackend) {
            alert(data + 'data');
            alert(status + 'status');
            alert(headers + 'headers');
            alert(config + 'config');
            alert('server is not responding');
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
          alert('liked');
          //     angular.forEach($scope.playlists, function())
          $scope.knowhowList[knowhow_id].like_count++;
        }
      ).finally(function () {
        });
    };

    $scope.doRefresh = loadFeed;
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
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
        url: $rootScope.backEnd + 'knowhow_controller/knowhow?callback=JSON_CALLBACK',
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
  })

  .controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, serverCall, serviceUrls) {
    console.log('in ProfileCtrl');

    var getCategoriesSuccessCallback = function (data, status) {
      $scope.categories_list = data;
      console.log(data)
    };

    var getCategoriesErrorCallback = function (data, status) {
      $scope.categories_list = '';
    };

    var config = {
      method: 'GET',
      url: serviceUrls.api_url + serviceUrls.category_list,
      user_token: "325c72d55d5c6c188329849b5da6d7bb70e9e6983bdf8b4a0c39190d7f0ccfde"
    };

    serverCall
      .apiDataCall(config)
      .then(getCategoriesSuccessCallback, getCategoriesErrorCallback)


    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.profile_image = 'http://lifehacks.kz/assets/user_profile_images/50255a87dd6ce79b89e2caf2235900cca222a1242ae98feacacb74e0c45eb2e4_large.jpg';
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

  })
  .controller('ProfileLifeHacksCtrl', function ($scope, $rootScope, $stateParams, $http, $ionicModal, serviceUrls, serverCall) {

    $scope.lifehackedData;

    var lifeHackDataSuccessCallback = function (data, status) {
      $scope.lifehack_users = data;
      console.log(data)
    };

    var lifeHackDataErrorCallback = function (data, status) {
      $scope.lifehackedData = '';
    };

    var config = {
      method: 'GET',
      url: serviceUrls.api_url + serviceUrls.life_hacks,
      user_token: "325c72d55d5c6c188329849b5da6d7bb70e9e6983bdf8b4a0c39190d7f0ccfde"
    };

    serverCall
      .apiDataCall(config)
      .then(lifeHackDataSuccessCallback, lifeHackDataErrorCallback)


  })
  .controller('ProfileLikedCtrl', function ($scope, $stateParams) {
    console.log('in ProfileLikedCtrl')
  });
