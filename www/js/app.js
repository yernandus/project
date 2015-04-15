var hasBackend = false;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform, $rootScope) {
    $rootScope.backEnd = 'http://lifehacks.kz/index.php/api/';

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html"
      })

      .state('app.home', {
        url: "/home",
        views: {
          'menuContent': {
            templateUrl: "templates/home.html",
            controller: 'HomeController'
          }
        }
      })

      .state('app.search', {
        url: "/lifehack",
        views: {
          'menuContent': {
            templateUrl: "templates/lifehack.html",
            controller: 'NoteController'
          }
        }
      })

      .state('app.playlists', {
        url: "/playlists",
        views: {
          'menuContent': {
            templateUrl: "templates/list.html",
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
          'menuContent': {
            templateUrl: "templates/playlist.html",
            controller: 'PlaylistCtrl'
          }
        }
      })
      .state('app.login', {
        url: "/login",
        views: {
          'menuContent': {
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl'
          }
        }
      })
      .state('app.signup', {
        url: "/signup",
        views: {
          'menuContent': {
            templateUrl: "templates/signup.html",
            controller: 'SignupCtrl'
          }
        }
      })

      .state('app.profile', {
        url: "/profile",
        views: {
          'menuContent': {
            templateUrl: "templates/profile.html",
            controller: 'ProfileCtrl'
          }
        }
      })
      .state('app.profile.lifehacks', {
        url: "/lifehacks",
        views: {
          'tab-lifehacks': {
            templateUrl: "templates/profile-lifehacks.html",
            controller: 'ProfileCtrl'
          }
        }
      })
      .state('app.profile.liked', {
        url: "/liked",
        views: {
          'tab-liked': {
            templateUrl: "templates/profile-liked.html",
            controller: 'ProfileCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
    if (!ionic.Platform.isIOS()){
      $ionicConfigProvider.scrolling.jsScrolling(false);
    }
  })

  .run(function ($http) {
//    $http.defaults.headers.common.Authorization = 'Basic 325c72d55d5c6c188329849b5da6d7bb70e9e6983bdf8b4a0c39190d7f0ccfde'
  });
