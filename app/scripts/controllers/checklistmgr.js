'use strict';

angular.module('CCS-Safety')
  .controller('ChecklistmgrCtrl', ['$scope', '$location',
    function ($scope, $location) {
      $scope.gotoNewCheckList = function() {
        $location.path('/newchecklist');
      };

      $scope.gotoCheckListList = function(){
        $location.path('/checklist');
      };
  }]);
