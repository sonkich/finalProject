myApp.controller("registerController",function($scope,$http,$httpParamSerializerJQLike,$location){

   $scope.userData = {};
   $scope.userData.username = '';
   $scope.userData.email = '';
   $scope.userData.password = '';
   $scope.userData.password2 = '';

   $scope.userData.errors = {};
   $scope.userData.errors.username = '';
   $scope.userData.errors.email = '';
   $scope.userData.errors.password = '';
   $scope.userData.errors.password2 = '';


   $scope.register = function(){
      $http({
	  		  method: 'POST',
	  		  url: './server/register.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike($scope.userData)

	  		}).then(function successCallback(response) {
               console.log(response.data.errors);
               if(response.data.errors.length == 0){
                   $location.path('/login');
               }else{
                  $scope.userData.errors.username =
                        (response.data.errors.username)? response.data.errors.username :'';
                  $scope.userData.errors.password =
                        (response.data.errors.password)? response.data.errors.password :'';
                  $scope.userData.errors.password2 =
                        (response.data.errors.password2)? response.data.errors.password2 :'';
                  $scope.userData.errors.email =
                        (response.data.errors.email)? response.data.errors.email :'';
               }

	  		  }, function errorCallback(response) {
	  			   console.log(response + "ERROR");
	  		});
   }
});
