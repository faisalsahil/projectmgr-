'use strict';

angular.module('CCS-Safety')
  .controller('ProjectlistCtrl', ['$scope', '$location', 'Api', 'Sharedata',
    function ($scope, $location, Api, Sharedata){
      Sharedata.clear();
      var projects = [];
      Api.get(settings.url + 'projects.json')
      .then(function(data){
          if(data.error)
          {
            // console.log("46666666666666666666666666666666666666666666");
            // console.dir(data.error);

          }
          else
          {
            projects = data;
            
            var spinnerData =_.map(data, function(project){
              return {key: project.id, value: project.name};
            });
            
            
            Sharedata.set('projectlist',spinnerData);
            $scope.projectls = Sharedata.get('projectlist',spinnerData);
            
            
          }
        }
      );

      var selectProjectData = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        var projectId = selectedData.keys[0];
        var selectedProject = _.find(projects, function (project){
          return project.id === projectId;
        });
        console.dir(selectedProject);
        Sharedata.set('project', selectedProject);
        $location.path('/checklist/' + projectId);
        $scope.$apply();
      };

      $scope.selectproject = function(){
        var projectId = $(this)[0].i.key;

        Sharedata.set('project', $(this)[0].i);
        $location.path('/checklist/' + projectId);
        $scope.$apply();
      }

      $scope.editproject = function()
      {
        // alert($(this)[0].i.key);
        Sharedata.set('Editprojects', $(this)[0].i.key);
        $location.path('/editproject');
      };

      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });
  }]);