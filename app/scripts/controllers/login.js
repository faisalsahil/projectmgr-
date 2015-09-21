'use strict';

angular.module('CCS-Safety')
  .controller('LoginCtrl', ['$scope','$location', 'Api','Sharedata', function ($scope, $location, Api,Sharedata) {
     var index ;
     var name;
     var pwd;
     var options = [];

    if(window.location.hash == "#/user")
    {
      console.log("--0-0-0-0-0-0-0-0-0-0-0");
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

    if(window.localStorage.getItem("count"))
    {
     index = window.localStorage.getItem("count");
     index++;
       
     
       
     var count = window.localStorage.getItem("count");
      for (var i = 0 ; i <= count ; i++)
      {
       // Things[i]
       name = window.localStorage.getItem("name"+i);
       pwd = window.localStorage.getItem("password"+i);
       options[i] = {name: name, id: i};
      
       $scope.credentials = options;
      };
    }else{ index = 0;}

    if(Sharedata.get('usersignup')) {
      
      document.getElementById("userin").setAttribute("class", "");
      $scope.usersignup = Sharedata.get('usersignup');
    }

    $scope.gotoNewUser = function (){
      $location.path("/newUser");

    };
    
    $scope.addUser = function (){
      $location.path('/user');
    };

    $("#loginForm").validate({
      rules: {
        usernameTxt: {
            required: true,
            maxlength : 100
          },
        passwordTxt: {
            required: true,
            maxlength : 100
          }
        },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          var user = {user: $scope.user};
          
          var promise = Api.post(settings.url + 'users/sign_in.json', {data : user});
          $("form [type=submit]").button('loading');
          promise.then(
            function (data){
              if(data && data.user)
              {
                window.sessionStorage.token = data.authenticity_token;
                window.sessionStorage.user = data.user.first_name;
                

                if($scope.user.remember == true)
                {

                  // window.localStorage.setItem("email", data.user.email);

                  window.localStorage.setItem("count", index);
                  window.localStorage.setItem('name'+index, data.user.username);
                  window.localStorage.setItem('password'+index,$scope.user.password);
                  var username = window.localStorage.getItem('name'+index);
                  var password = window.localStorage.getItem('password'+index);
                 
                }
                // else{
                //   window.localStorage.clear();
                // }
                // console.log($scope.user.password);
                // console.log(password);
                // console.log($scope.user[0].password);
                //TODO: save the user at session storage
                $location.path('/projectMgr');
              }
              else
              {
                $scope.invalidCredentials = true;
              }
            }
          );

          promise.finally(function (){
            $("form [type=submit]").button('reset');
          });
        }
    });

    
    $("#userForm").validate({
      rules: {
        emailTxt: {
            required: true,
            email: true,
            // minlength: 6,
            maxlength : 100
        },
        fnameTxt: {
            required: true,
            maxlength : 100
        },
        usernameTxt: {
            required: true,
            maxlength : 100
        },
        passwordTxt: {
          required: true,
          maxlength : 100
        },
        password_conTxt: {
          required: true,
          maxlength : 100,
          equalTo: "#passwordTxt",
        },
        companyTxt: {
          required: true,
          maxlength : 100
        },
        phoneTxt: {
          required: true,
          maxlength : 100
        }
      },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          var user = {user: $scope.newuser};
          // console.log("user");
          // console.dir(user);
          var promise = Api.get(settings.url + 'users/add_user.json', {user: $scope.newuser });
          // $("form [type=submit]").button('loading');
          promise.then(
            function (data){
              if(data == 'true')
              {
                
                Sharedata.set('usersignup', "Your account successfully created. Please login to proceed.");
                $location.path('/login');
              }
              else
              {
                document.getElementById("error-div").setAttribute("class", "");
                $scope.error = data.first_name[0];

                // alert(data.email[0])
              }
            }
          );

          // promise.finally(function (){
          //   $("form [type=submit]").button('reset');
          // });
        }
    });


    $scope.usernameselect = function(){
      console.log($scope);
      console.log($scope.user.first_name.id);
      var uid = $scope.user.first_name.id;
      // document.getElementById(uid).getAttribute('selected')).toBeTruthy();
      $scope.user = {username: $scope.user.first_name.name,password: window.localStorage.getItem("password"+uid)};
      // $scope.selecteditem = $scope.user.first_name.name;
    };



    $scope.scrollWin = function(){
      window.scrollBy(0,200);   
    }


    $scope.forgotpassword = function(){
      $location.path("/passwordreset");
    };

    // $scope.adduser = function(){
    //   console.log("ddffdf");
    // };



  }]);