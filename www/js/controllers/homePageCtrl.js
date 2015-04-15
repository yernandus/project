angular.module('starter.controllers')

.controller('HomeController', function ($scope, $stateParams, $ionicModal, $log, $rootScope, $http, $location, serviceUrls, serverCall) {
  console.log('in home')
  localStorage.removeItem('user_token');
  $location.path('/app/home')
})