angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $log, $timeout) {

    $log.info('Inside AppCtrl');

    if(localStorage.getItem('user_token')){
      $rootScope.loggedin = true;
    }else{
      $rootScope.loggedin = false;
    }

  });