'use strict';

angular.module('CCS-Safety')
  .controller('ProjectmgrCtrl', ['$scope', '$location', 'Api','Sharedata',
    function ($scope, $location, Api, Sharedata) {
      Sharedata.clear();
      
      
      Api.get(settings.url + 'projects.json')
      .then(function(data){
          if(data.error)
          {
            // console.log("Errorrrrrrrrrrrrrrrrrrrrrrrrrr");
            console.log(data);
            // console.log("hhhhhhhhh");

          }
          else
          {console.log(data);
            if(data.length > 0 && data.length < 500)
            {
              document.getElementById("viewproj").setAttribute("class", "");
            }
          }
        }
      );



      $scope.gotoNewProject = function (){
        $location.path('/newProject');
      };
      $scope.gotoProjectList = function (){
        $location.path('/projectlist');
      };

      
  }]);