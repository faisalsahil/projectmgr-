'use strict';

angular.module('CCS-Safety')
  .controller('UnansweredemailCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
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
                 // window.localStorage.setItem("sendEmail", $scope.user1.email);
                // document.getElementById('mailsent').setAttribute("class", "");
                $location.path('/unresolved/'+ $scope.cat_id);
                Sharedata.set('unresolved_notice', "Email successfully sent.");
              }
              else
              {
                window.localStorage.setItem("sendEmail", $scope.user1.email);
                document.getElementById('mailsent').setAttribute("class", "");
                // console.log("-------------------------qq");
              }
            }
          );
          promise.finally(function (){
            $("form [type=submit]").button('reset');
          });
        }
      });
  }]);