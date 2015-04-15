angular.module('starter.controllers')
.controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, $log, $rootScope, $http, serviceUrls, serverCall) {
  console.log('in ProfileCtrl');

  var config = {
    method: 'GET',
    url: serviceUrls.api_url + serviceUrls.category_list,
    user_token: "325c72d55d5c6c188329849b5da6d7bb70e9e6983bdf8b4a0c39190d7f0ccfde"
  };

  serverCall
    .apiDataCall(config)
    .then(function (data, status) {
      $scope.categories_list = data;
      console.log(data)
    }, function (data, status) {
      $scope.categories_list = '';
    });

  $scope.categoryChanged = function (selected_category) {
    $log.log(selected_category)
  };

  var profile_config = {
    method: 'GET',
    url: serviceUrls.api_url + serviceUrls.profile_details,
    user_token: "325c72d55d5c6c188329849b5da6d7bb70e9e6983bdf8b4a0c39190d7f0ccfde"
  };

  $scope.profile_details = {};

  serverCall
    .apiDataCall(profile_config)
    .then(function (data, status) {
      $scope.profile_details = data[0];
      console.log('profile : ', data[0])
    }, function (data, status) {
      $scope.profile_details = '';
    });

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
    $scope.profile_image = 'http://lifehacks.kz/assets/user_profile_images/50255a87dd6ce79b89e2caf2235900cca222a1242ae98feacacb74e0c45eb2e4_large.jpg';
  });

  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });

  $scope.lifeHacks_active = true;
  $scope.lifehack_users = [];

  $scope.getLifeHacks = function () {
    $scope.lifeHacks_active = true;
    $scope.loading = true;

    var lifeHackDataSuccessCallback = function (data, status) {
      $scope.lifehack_users = data;
      $scope.loading = false;
      console.log(data)
    };

    var lifeHackDataErrorCallback = function (data, status) {
      $scope.lifehack_users = [];
      $scope.loading = false;
    };

    var config = {
      method: 'GET',
      url: serviceUrls.api_url + serviceUrls.life_hacks,
      user_token: "325c72d55d5c6c188329849b5da6d7bb70e9e6983bdf8b4a0c39190d7f0ccfde"
    };

    serverCall
      .apiDataCall(config)
      .then(lifeHackDataSuccessCallback, lifeHackDataErrorCallback)

  };

  $scope.getLifeHacks();

  /*$scope.getLiked = function () {
   $scope.lifeHacks_active = false;
   };*/


})