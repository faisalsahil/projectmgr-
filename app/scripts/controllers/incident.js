'use strict';

angular.module('CCS-Safety')
  .controller('IncidentCtrl', ['$scope', '$location', '$routeParams','Api','Sharedata',
    function ($scope, $location, $routeParams, Api,Sharedata){
      $scope.report = {project_id : $routeParams["id"]};


      $scope.project = Sharedata.get('project');
      var projectId = $scope.project.key;
      // console.log($scope.project);

      Api.get(settings.url + 'projects/' + projectId + '/incidents.json')
        .then(function (data){
          if (data.error){
            // console.dir(error);
          } 
          else
          {

            var records = _.map(data, function (incident){
              var asas=  incident.id;
              return {key : incident.id, value : incident.report_type };
            });
            $scope.incidents = records;
          } 
      });  


      $scope.create_incident = function(){
        // console.log();
        $location.path('/incidentReport/'+projectId);
      }

      $scope.selectincidentreport = function(){
        // Sharedata.set('checklist', $(this)[0].i.key);
       
        $location.path('/showincident/' + $(this)[0].i.key);
      };







      
  }]);