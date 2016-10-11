myApp.controller("loginController",function($scope,$http,$httpParamSerializerJQLike){
   $scope.usernameData = {};

   $scope.usernameData.username = '';
   $scope.usernameData.password = '';

   $scope.login = function(){

      $http({
	  		  method: 'POST',
	  		  url: './server/login.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike($scope.usernameData)

	  		}).then(function successCallback(response) {
	  			   console.log(response);
	  		  }, function errorCallback(response) {
	  			   console.log(response + "ERROR");
	  		});
   };

   function getHaveBaby (username){

   };
});
