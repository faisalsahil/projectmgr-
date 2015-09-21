'use strict';

angular.module('CCS-Safety')
  .controller('EditProjectCtrl', ['$scope','$location', 'Api','Sharedata',
   function ($scope, $location, Api, Sharedata) {
    // alert("sdsdhsgjhgd");
    var projId = Sharedata.get('Editprojects');

    Api.get(settings.url + 'projects/'+projId+'/edit.json')
      .then(function(data){
        if(data.error)
        {
          // console.log("Errorrrrrrrrrrrrrrrrrrrrrrrrrr");
          // console.dir(data.error);
        }
        else
        {
         
          $scope.project = {name: data.name, address: data.address, contact_info: data.contact_info, data: ''};
          
        }
      }
    );

    $("#editprojectForm").validate({
      rules: {
        nameTxt: {
            required: true,
            // minlength: 6,
            maxlength : 100
          },
        addressTxt: {
            required: true,
            maxlength : 100
        },
        contactTxt: {
          required: true,
          maxlength : 100
        }
        },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          var user = {user: $scope};
        
          console.log($scope.project);
          var promise = Api.patch(settings.url + 'projects/'+projId+'.json', {project: $scope.project });
          promise.then(
            function (data){
              console.log(data);
              if(data)
              {
                // console.log("00000000000000000000000000000000");
                $location.path('/projectlist');
              }
              else{
              // {console.log("99999999999999999999999999999999999");
              }
            }
          );
        }
    });

    $scope.scrollWin = function(){
      console.log("scrolled ");
      window.scrollBy(0,200);   
    }
}]);
