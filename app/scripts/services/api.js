'use strict';

angular.module('CCS-Safety')
  .service('Api', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope, endpoint, params){
    this.get = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "GET",
        headers: {
          'content-type':'application/json'
        },
        params: params
      }).
      success(function(data, status, headers, config) {
        console.log('success');
        console.dir(data);
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        console.log('failed');
        deferred.resolve(data);
      });
      return deferred.promise;
    };
    this.post = function(endpoint, params) {
      var deferred = $q.defer();
      console.log(params);
      $http({
        url: endpoint,
        method: "POST",
        headers: {
          'content-type':'application/json'
        },
        data: params
      }).
      success(function(data, status, headers, config) {
        console.log('success');
        console.log(data)
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        console.log('failed');
        console.dir(data);
        deferred.resolve(data);
      });
      return deferred.promise;
    };
    this.put = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "PUT",
        headers: {
          'content-type':'application/json'
        },
        data: params
        }).
        success(function(data, status, headers, config) {
          console.log('success');
          //console.log(data);
        deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          console.log('failed');
          console.dir(data);
          deferred.resolve(data);
        });
        return deferred.promise;
    };
    this.patch = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "PATCH",
        headers: {
          'content-type':'application/json'
        },
        data: params
        }).
        success(function(data, status, headers, config) {
          console.log('success');
          //console.log(data);
        deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          console.log('failed');
          console.dir(data);
          deferred.resolve(data);
        });
        return deferred.promise;
    };
    this.del = function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: endpoint,
        method: "DELETE",
        headers: {
          'content-type':'application/json'
        },
        data: params
        }).
        success(function(data, status, headers, config) {
          console.log('success');
          //console.log(data['data']);
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          console.log('failed');
          //console.log(data);
          deferred.resolve(data);
        });
        return deferred.promise;
    };
  }]);

  
