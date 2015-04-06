angular.module('starter.services', ['ngResource'])

  .factory('CateoryFactory', function ($resource, $rootScope) {
    return $resource($rootScope.backEnd + 'get_category', {
      callback: "JSON_CALLBACK"
    }, {
      get: {method: 'JSONP', isArray: true}
    })
  })

  .factory('serverCall', function ($http, $q) {
    var instance = {}, config = null;

    instance.apiDataCall = function (config) {
      var deferred = $q.defer();
      $http(config)
        .success(function (data, status, header, config) {
          deferred.resolve(data, status);
        })
        .error(function (data, status, header, config) {
          deferred.reject(data, status);
        });
      return deferred.promise;
    };

    return instance;
  });

