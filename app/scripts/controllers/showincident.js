'use strict';

angular.module('CCS-Safety')
  .controller('ShowincidentCtrl', ['$scope', '$location', '$routeParams','Api','Sharedata',
    function ($scope, $location, $routeParams, Api,Sharedata){
      $scope.report = {project_id : $routeParams["id"]};


      $scope.project = Sharedata.get('project');
      var projectId = $scope.project.key;
      var incidentId = $routeParams.id
      // console.log($scope.project);
      Api.get(settings.url + 'projects/' + projectId + '/incidents/' + incidentId + '/view_incident.json')
        .then(function (data){
          if (data.error){
            // console.dir(error);
          } 
          else
          {
            $scope.incident = data;
            $scope.filea = data.file.url
          } 
      });  
     
  }]);