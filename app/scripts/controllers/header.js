'use strict';

angular.module('CCS-Safety')
  .controller('HeaderCtrl', ['$scope', '$location', 'Sharedata', 'Api',
    function ($scope, $location, Sharedata,Api) {
      var isBackAllowed = true;
      var isHomeAllowed = true;
      $scope.isBackAllowed = function (){
        return isBackAllowed;
      };

      $scope.isHomeAllowed = function (){
        return isHomeAllowed;
      };

      $scope.gotoHome = function (){
        $location.path('/projectMgr');
        Sharedata.clear();
      }

      $scope.gotoBack = function (){
        window.history.back();
      };

      $scope.gotoLogin = function(){
        $location.path('/login');
        Sharedata.clear();
      };

      $scope.logout = function(){
        console.log(window.sessionStorage.token);
        console.log(window.sessionStorage.user)
        
        Api.get(settings.url + 'users/sign_out.json',{method: "delete"})
        .then(function (data){
          if (data.error){
            // console.dir(error);
          } else {
            $location.path('/login');
          } 
        });  

      };

      var updateHeaderStatus = function () {
        var location = ($location.path().match(/\/\w+/)|| [])[0];
        $scope.project = Sharedata.get('project');

        switch (location) {
          case '/':
          case '/login':
            isBackAllowed = false;
            isHomeAllowed = false;
            break;
          default:
            isBackAllowed = true;
            isHomeAllowed = true;
            break;
        }
      };
        

      $scope.$on('$locationChangeSuccess', updateHeaderStatus);

  }]);