myApp.controller("loginController",function($rootScope,$scope,$http,$httpParamSerializerJQLike){
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
               console.log(response.data);
               if(!response.data.username){
                  $scope.errors = response.data.error;
               }else{
                  $scope.errors = '';
                  localStorage.setItem("username", response.data.username);
                  $rootScope.hasBaby = response.data.isAlive;
               	$rootScope.user = response.data.username;
               	$rootScope.logged = 1;
               }

	  		  }, function errorCallback(response) {
	  			   console.log(response + "ERROR");
	  		});
   };

});
