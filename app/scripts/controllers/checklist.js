'use strict';

angular.module('CCS-Safety')
  .controller('ChecklistCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
    function ($scope, $location, $routeParams, Api, Sharedata) {
      if(!Sharedata.get('project')) {
        $location.path('/projectMgr');
        return;
      }

      var projectId = $routeParams.id;
      $scope.project = Sharedata.get('project');
      var checklistList = [];
      var gootReports = [];
      Api.get(settings.url + 'projects/'+ projectId +'/reports.json')
      .then(function (data){
        if(data.error)
        {
          console.dir(data.error);
        }
        else
        {
          checklistList = data.reports;
          gootReports = data.goodreports;
          
          var checklistMap = _.map(checklistList, function (checklist){
           var arr = checklist.name.split(" ");
            var asas=  checklist.user_id;
            return {key : checklist.id, value : arr[arr.length - 1] , issues : checklist.user_id , catname: checklist.catname};
          });


          if(gootReports.length > 0){

            document.getElementById("goodchkls").setAttribute("class", "layout");
            var goodchecklistMap = _.map(gootReports, function (goodchecklist){
             var arr1 = goodchecklist.name.split(" ");
              return {key : goodchecklist.id, value : arr1[arr1.length - 1] };
            });

            Sharedata.set('goodcheckls',goodchecklistMap);
            $scope.goodcheckls = Sharedata.get('goodcheckls');

          }

           Sharedata.set('checkls',checklistMap);
            $scope.checkls = Sharedata.get('checkls');        

        }
      });

      $scope.addchecklist = function(){

        // var is_confirmed = confirm("Press 'OK' if you want to create a new checklist.");
        // if(is_confirmed)
        // {
        // console.log(is_confirmed);
          document.getElementById("add_checklist").setAttribute('class', "hidden");
          document.getElementById("add_checklist_disabled").setAttribute('class', "");
          document.getElementById("add_checklist_disabled").setAttribute('class', "btn col-xs-6 disabled");
         Api.get(settings.url +'projects/'+ projectId +'/submit_report.json')
          
        .then(function (data){
          if(data.error)
            {console.dir(error);
          }
          else
          {
           // console.log("hurrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaaaaaaaaayyyyyyyyyyyyyyyyyyyyyyyyy");
           // console.log(data);
           
           Sharedata.set('checklist', data.id);
           Sharedata.set('hide_notice_div', 1);
           $scope.checklistid = data.id;
           $location.path('/categoryList/' + data.id);
           $scope.$apply();
          }
        });
        // }  
      }


      $scope.view_incident = function(){
        $location.path('/incident/' + projectId);
      };


       $scope.selectcheckls = function(){
        Sharedata.set('checklist', $(this)[0].i.key);
        Sharedata.set('notice', "null");
        $scope.checklistid = $(this)[0].i.key;
        $location.path('/categoryList/' + $(this)[0].i.key);
        $scope.$apply();
      }

      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });
  }]);