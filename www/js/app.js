var hasBackend = false;
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform,$rootScope) {
      $rootScope.backEnd = 'http://lifehacks.kz/index.php/api/';

      $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/lifehack",
    views: {
      'menuContent': {
        templateUrl: "templates/lifehack.html"  ,
          controller: 'NoteController'
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
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
          controller: 'ProfileLifeHacksCtrl'
        }
      }
    })
    .state('app.profile.liked', {
      url: "/liked",
      views: {
        'tab-liked': {
          templateUrl: "templates/profile-liked.html",
          controller: 'ProfileLikedCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})

  .run(function($http) {
//    $http.defaults.headers.common.Authorization = 'Basic 325c72d55d5c6c188329849b5da6d7bb70e9e6983bdf8b4a0c39190d7f0ccfde'
  });
