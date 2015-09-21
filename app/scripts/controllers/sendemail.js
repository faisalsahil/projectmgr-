'use strict';

angular.module('CCS-Safety')
  .controller('SendemailCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
    function ($scope, $location, $routeParams, Api, Sharedata) {
      if(!Sharedata.get('project')) {
        $location.path('/projectMgr');
        return;
      }

      if(window.localStorage.getItem("sendEmail"))
      {
       
        var email = window.localStorage.getItem("sendEmail");
        $scope.user1 = { email: email, data: '' };
      }

      // var projectId = $routeParams.id;
      $scope.project = Sharedata.get('project');
      // var ans_id = Sharedata.set("answer_id");
      $scope.checklist = Sharedata.get('checklist');
      $scope.q_id  = Sharedata.get('question_id');
      $scope.cat_id = Sharedata.get('cat_id');
      // console.log($scope.project);

      $scope.user  ={email: window.sessionStorage.user};

      
      $("#emailForm").validate({
      rules: {
        emailTxt: {
            required: true,
            email: true,
            minlength: 6,
            maxlength : 100
          }
      },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          var user = {user: $scope.user1};
          document.getElementById('mailsent').setAttribute("class", "hidden");
          var promise = Api.post(settings.url + 'incidents/'+ $scope.checklist +'/send_email.json', {email: $scope.user1.email ,qid: $scope.q_id});
          $("form [type=submit]").button('loading');
          promise.then(
            function (data){
              if(data)
              {
                 window.localStorage.setItem("sendEmail", $scope.user1.email);
                document.getElementById('mailsent').setAttribute("class", "");
              }
              else
              {
                console.log(data)
                // console.log("-------------------------qq");
              }
            }
          );
          promise.finally(function (){
            $("form [type=submit]").button('reset');
          });
          ////////////////////////////////
          var qid = $scope.q_id+1;
          Api.get(settings.url + 'questions/' + qid + '/get_question.json')
            .then(function (data){
              if (data.error){
                // console.dir(error);
              } 
              else 
              {
                if(data.category_id == $scope.cat_id)
                {
                  Api.get(settings.url +'questions/'+ qid +'/reports/'+$scope.checklist+'/getanswerid.json').
                  then(function (data1){
                    if(data1.error)
                      {console.dir(error);
                    }
                    else
                    {
                      Sharedata.set('question_id', qid);
                      Sharedata.set('notice', "null");
                      Sharedata.set('q_body', data.body);
                      // $scope.question_body = data.body;
                      $location.path('/answer/'+data1[0].id);
                      $scope.$apply();
                    }
                  });
                }
                else{
                  Sharedata.set('notice', "Please select another category to proceed.");
                  $location.path('/categoryList/' + $scope.checklist);
                  // $location.path('/sendemail');
                  $scope.$apply();
                }
              }
          });
        }
      });
  }]);