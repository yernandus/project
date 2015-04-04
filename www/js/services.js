angular.module('starter.services', ['ngResource'])
.factory('CateoryFactory', function($resource, $rootScope){
        return $resource( $rootScope.backEnd +'get_category', {
            callback: "JSON_CALLBACK"
        }, {
            get:{method: 'JSONP',isArray: true}
        })
    });