'use strict';

angular.module('CCS-Safety')
  .controller('PasswordresetCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
    function ($scope, $location, $routeParams, Api, Sharedata) {
    
    if(window.location.hash != "#/passwordreset ")
    { 
      
      document.getElementById('navbar').setAttribute('class', "hidden");
      document.getElementById('newnavbar').setAttribute('class', "");
      document.getElementById('newnavbar').setAttribute('class', "header navbar-fixed-top");
    } 
    else
    {
      
      document.getElementById('navbar').setAttribute('class', "");
      document.getElementById('newnavbar').setAttribute('class', "header navbar-fixed-top");
      document.getElementById('newnavbar').setAttribute('class', "hidden");
    } 


     $("#resetpwdForm").validate({
      rules: {
        usernameTxt: {
          required: true,
          maxlength : 100
          }
        },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          var user = {user: $scope.reset};
          var promise = Api.post(settings.url + 'users/password.json', {user:{username : $scope.reset.username}});
          $("form [type=submit]").button('loading');
          promise.then(
            function (data){
              if(data && data.user)
              {
                console.log("error");
                console.log(data);
                // $location.path('/projectMgr');
              }
              else
              {
                console.log("true");
                console.log(data);
                Sharedata.set('usersignup','You will receive an email with instructions on how to reset your password in a few minutes.')
                // $scope.invalidCredentials = true;
                $location.path('/login');
              }
            }
          );

          promise.finally(function (){
            $("form [type=submit]").button('reset');
          });
        }
    });


  }]);