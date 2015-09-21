'use strict';

angular.module('CCS-Safety')
  .controller('IncidentreportCtrl', ['$scope', '$location', '$routeParams','Api',
    function ($scope, $location, $routeParams, Api){
      $scope.report = {project_id : $routeParams["id"]};

      Api.get(settings.url + 'projects/' + $routeParams["id"] + '/incidents/empty_incident.json')
        .then(function (data){
          if (data.error){
            // console.dir(error);
          } else {
            $scope.incidentId = data.id;
          } 
      });  







      $("#reportForm").validate({
        rules: {
          typeTxt : {
            required: true
          },
          yourNameTxt : {
            required: true,
            maxlength: 100
          },
          jobTitleTxt : {
            required: true
          },
          injuryDateTxt : {
            required: true,
            maxlength: 100
          },
          injuryTimeTxt : {
            required: true,
            maxlength: 100
          },
          witnessesTxt : {
            required: true,
            maxlength: 500
          },
          locationTxt : {
            required: true,
            maxlength: 100
          },
          circumstancesTxt : {
            required: true,
            maxlength: 1000
          },
          descriptionTxt : {
            required: true,
            maxlength: 1000
          },
          injuriesTypeTxt : {
            required: true,
            maxlength: 1000
          },
          ppeTxt : {
            required: true,
            maxlength: 100
          },
          assistanceProvidedTxt: {
            required: true,
            maxlength: 1000
          }
        },
        highlight: validateUtils.highlight,
        unhighlight: validateUtils.unhighlight,            
        errorPlacement: validateUtils.errorPlacement,
        submitHandler: function() {
          $("form [type=submit]").button('loading');
          Api.post(settings.url + 'projects/' + $scope.report.project_id +'/incidents.json',{incident : $scope.report, incId: $scope.incidentId})
          .then(function (data){
            if (data.error){
              alert(data.error);
            } else {
              alert('Saved!');
              $location.path('/projectMgr');
            }
          })
          .finally(function(){
            $("form [type=submit]").button('reset');
          });
        }
      });


      var newUrl;
      $scope.takePic = function ()
      {
        try
        {
          // uploadPhoto("iVBORw0KGgoAAAANSUhEUgAAACUAAAAhCAYAAABeD2IVAAAFN0lEQVR4Xt2YaUwUZxjHFSxUCm3SStJIEARW7oBNQKhfyCKFVKUlJQEVaKMNbUqxCSDwgVIi8cIq1sYqsQlWqBy1Sq1cC3Is9yK4Qt3lkcNKI7dWLKd8oP/3LZOgzKzbsm3avskvy8zCzm+eeY53WTE/P/+v4/8hNTc3p5Pe3r4V7e03OFjmYC2wAWtw7u+RwnoBbACOYB14BZgvnH9pQcLFyMhIHhYWFnn06OcpWVlZh5OSkvdCTGZwKazVO3fuCkcUstTqm2dLS8sOHj+e+TFWVHR0dERqamr0sWPHP7t06fL5hoZG1fXrbdTael1Aa21tHQQxY0NL2VRWXst4/HiOxJienuECKlUrp6VFJcCP5XJ5KLsxQ0vZIwInpaRmZx9zqebmliUwsYiIiPcgZWFoKRkicJoJSHHrlkZSKiFhXyzLQYNHqrGx6UtdUvfuDUhKZWRkpLBCWLYU1nNgHdgUHPxWaHd3T74uqZmZWUKCi0plZ587aWJiIl9oEUZ/SQrLzsvLa3tZWfmh+/cfKEUk9I6WkOx1dfWNJ058kWZhYbFFKmo6hRDujyYmJttZAv9JeG41NTUv5gm5a9eqFN7em94WE5MSMraysgqEkFpaQDf4W2praxeEqLZWyaL0hFxVVXWVmZkZi9hKfaRWh4eHh4kI8A9Hl6b6+np6+HBcp9jw8AidPfs1RUZGka+vL6HHLYlafHwCr0h9pFaamprKkUcNLHGfAkINFBISQra2tuTn50d79rxPycnJqK6jdOjQYVwonoKDg8ne3p6cnJwoLi6eampquQyqV4Afp6R8Gg8pS0mphbVqgXX796d/ODU1rWEiYqjVai4SHr6DfHx8yM3NjTw8PCggIIAweujChTwaG7uPRzlBQ0PDNDg49DRdgYGB70DqebBqiRRPJGNjuaen57bFnDmTFf/o0W832AgxNJ2dP+W7urpuc3R05EDhRbFIud++3V3wRySYgOGZnJxC1IZIq+1CTrVwVCoVXbx48RwEnMWkXt648bXtCHkzHhstF0SYP76BgUHCPos6OjpRcVUazE8CQm6xfFNJRkrYCaSlpX2Aktayu5Kip6eX/P39WfXQqVNfUVHRD+zDeRFcufIjlZcr0MGzKTPzBJI5hQ1jQiOmI0eOtLLfWQxm4ifsus+qPhl6SCbESApEgSe1g4MD2dnZ0fr163k12tjYcAoLv4OENzvP35fJZPxVoajQsH4lkJ+fnwMhF31agqm5ufmWvr47peziUhw4cJALOTs7C/A2EBQUxPtYXl4eubi4sHNcKDY2lp9XKpUcPMpWJPh2tmPVd8y8il4TipxQj48/IjHQx1hj5BESorV582YqLi4RIoGfiyGzlxITk9B4mUwdfwU4lxgHIVt9x4wMDXC3paXlG2gJ+x48+JV0UVJSShiyVFBQyPsRtstUXV3DQZ4JEvwYacHJzf2WPTZXvQYylgMSNwFR0N6583MlNv87MBKycUwSLBbkxxqNllWZAGSqOcKxQqEQeWzSHX1NVNS7u3C3naOjYwRY1+3IyclNQ34pR0ZGSR9wM1RRUSkJKrMNebaVtQB9pDxv3uwoWjwSIMjBqmbH+oKtCbu4GFzs/Pmcb1jVAWkpZh0TE7O7v/8Xunu3f7nwPdPVq8Vi8ELA1zNKT09PY/1Jl5QMv3wanZc1xmXT1UW8iaKpisHfw/fDJki9rkvKG1+PqthMMhRoCZhp30ty+XIRYVscADEjKam1mNhvuru7bzUkqLKt6PoSyFiyb3hWoq/6p/nP/Cvod4M+AYycVdHoAAAAAElFTkSuQmCC");          
          
          var options = {
            sourceType: 1,
            quality: 60,
            destinationType: Camera.DestinationType.DATA_URL
          };
          $scope.newUrl = newUrl;
          
          navigator.camera.getPicture(uploadPhoto,null,options);
          
          $scope.imagectrl();
        }
        catch(error){
          alert(error.message);
        }
      };

      function uploadPhoto(fileUrl){
        // $scope.report.file = fileUrl;
        newUrl = fileUrl;
        $scope.imageurl = fileUrl;
      }

      $scope.imagectrl = function(){
        $scope.path = 'data:image/jpeg;base64,'+ newUrl;
        setTimeout(function(){
            uploadimage(newUrl);
            // alert(fileUrl);
        }, 300);
      }

      function uploadimage(url){
        
        document.getElementById("camera-button").setAttribute("class", "hidden");
        document.getElementById("disable-button").setAttribute("class", "");
        document.getElementById("disable-button").setAttribute("class", "btn btn-primary col-xs-12 disabled");
        Api.patch(settings.url + 'projects/' + $routeParams["id"] + '/incidents/' + $scope.incidentId + '/upload_image', {incident:{file:  $scope.imageurl }})
          .then(function (data){
            if (data.error){
              // console.dir(error);
              document.getElementById("camera-button").setAttribute("class", "");
              document.getElementById("camera-button").setAttribute("class", "btn btn-picture col-xs-12");
              document.getElementById("disable-button").setAttribute("class", "hidden");
            } 
            else 
            {
              alert("Image Successfully Uploaded");
              document.getElementById("picupload").setAttribute("class", "");
              document.getElementById("camera-button").setAttribute("class", "");
              document.getElementById("camera-button").setAttribute("class", "btn btn-picture col-xs-12");
              document.getElementById("disable-button").setAttribute("class", "hidden");
              $scope.file = settings.url+data.url              
            }    
        });
      }


      



  }]);