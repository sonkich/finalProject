myApp.controller("loginController",function(loggedUserSvc,$rootScope,$scope,$http,$httpParamSerializerJQLike, $location){
   $scope.usernameData = {};

   $scope.usernameData.username = '';
   $scope.usernameData.password = '';
   $scope.errors = '';

   $scope.login = function(){

      $http({
	  		  method: 'POST',
	  		  url: './server/login.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike($scope.usernameData)

	  		}).then(function successCallback(response) {

               if(!response.data.username){
                  $scope.errors = response.data.error;
               }else{
                  $scope.errors = '';
                  localStorage.setItem("username", response.data.username);
                  loggedUserSvc.setInfo(response.data.username);
               	
               }

	  		  }, function errorCallback(response) {
	  			   console.log(response + "ERROR");
	  		});
   };

});
