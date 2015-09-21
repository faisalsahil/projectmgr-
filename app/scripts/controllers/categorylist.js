'use strict';

angular.module('CCS-Safety')
  .controller('CategorylistCtrl', ['$scope', '$location', 'Api', 'Sharedata',
    function ($scope, $location, Api, Sharedata){
      if(!Sharedata.get('project')) {
        $location.path('/projectMgr');
        return;
      }

      $scope.project = Sharedata.get('project');
      console.log("---------------------------11");
      console.log($scope.project);
      $scope.notice = Sharedata.get('notice');
      $scope.checklist = Sharedata.get('checklist');
      var spinnerData;
      if($scope.notice != "null")
      {
       document.getElementById("notice").setAttribute("class", "");  
      }
      else if(Sharedata.set('hide_notice_div')){
        document.getElementById("notice").setAttribute("class", "hidden");
      }
     
      Api.get(settings.url + 'categories.json',{report: $scope.checklist})
      .then(function(data){
        
          if(data.error)
          {
            console.dir(data.error);
          }
          // if (data.obj.category.length ).obj.category
          else  if (data.length > 1) 
          {
            spinnerData =_.map(data, function(category){
              return {key: category.id, value: category.name};
            });
            
          }
          else
          {
            spinnerData =_.map(data, function(category){
              return {key: category.id, value: category.name};
            });
            
            $scope.userCatId = spinnerData[0].key;
          }

          Sharedata.set('catls',spinnerData);
          $scope.catls = Sharedata.get('catls');
        }
      );

      var selectCategoryData = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        var categoryId = selectedData.keys[0];
        $location.path('/questionList/' + categoryId);
        $scope.$apply();
      };

      $scope.selectcatls = function(){
        Sharedata.set('catls', $(this)[0].i);
        var categoryId = $(this)[0].i.key;
        Sharedata.set('cat_id', categoryId);
        Api.get(settings.url + 'categories/' + categoryId + '/question.json',{report: $scope.checklist})
        .then(function (data){
            console.log("================================");
            console.log(data.status)
            if(data.error)
            {
              console.dir(data.error);
            }
            else if(data.noanswer == true)                                     /// when we need question list page
            {
              // Sharedata.set('catls', $(this)[0].i);
              // var categoryId = $(this)[0].i.key;
              // alert(categoryId);
              $location.path('/unresolved/'+categoryId);
              $scope.$apply();
            }
            else                                      /////if(data.status == false)
            {
              var questionId = data.id;
              var answerId = data.answer_id;
              Sharedata.set('question_id', questionId);
              $location.path('/answer/'+answerId);
              $scope.$apply();
            }
            // else
            // {
            //   $location.path('/questionList/' + categoryId);
            //   $scope.$apply();
            // }
          }
        );
        // alert(categoryId);
        // $location.path('/questionList/' + categoryId);
        // $scope.$apply();
      };


      $scope.unresolved = function(){
        
        var categoryId = $scope.userCatId;
        Sharedata.set('cat_id', $scope.userCatId);
        Api.get(settings.url + 'categories/' + categoryId + '/noquestions.json',{report: $scope.checklist})
        .then(function (data){
            if(data.error)
            {
              console.dir(data.error);
            }
            else                                      ///// if(data.status == false)
            {
              var questionId = data.question_id;
              var answerId = data.id;
              Sharedata.set('question_id', questionId);
              $location.path('/resolved/'+answerId);
              $scope.$apply();
            }
          }
        );
      };
      
      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });
  }]);