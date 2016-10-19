myApp.controller("usersController",function(loggedUserSvc,$scope,$http,$location,$rootScope,$httpParamSerializerJQLike){


   $scope.data = [];
   getData();
   $scope.pageSize = 8;
   $scope.currentPage = 1;
   $scope.searchWord = '';

   $scope.alerts = {};

   $scope.alerts.success = false;
   $scope.alerts.errorFlag = false;
   $scope.alerts.error = '';

   $scope.successClose = function(){
      $scope.alerts.success = false;
   }

   $scope.dangerClose = function(){
      $scope.alerts.errorFlag = false;
   }

   $scope.friends = function(){
      $location.path("/friends");
   }

   $scope.ranking = function(){
      $location.path("/ranking");
   }

   $scope.openProfil = function(index) {
      var string = '/users/' + $scope.data[index].username;
       $location.path(string);
   }

   $scope.sendFriendRequest = function(index) {
      var sendingData = {};
      sendingData.receiver = $scope.data[index].username;
      sendingData.sender = loggedUserSvc.getInfo().username;

      if(sendingData.receiver != sendingData.sender){
         $http({
   	  		  method: 'POST',
   	  		  url: './server/addFriendRequest.php',
   	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data : $httpParamSerializerJQLike(sendingData)

   	  		}).then(function successCallback(response) {
   	  			   if(response.data.error.length != 0){
                     $scope.alerts.error = response.data.error;
                     $scope.alerts.errorFlag = true;
                  }else{
                     $scope.alerts.success = true;
                  }
   	  		  }, function errorCallback(response) {
   	  			console.log("ERROR");
     		    console.log(response.data);
   	  		});
      }else{
         $scope.alerts.error = "You cant invite yourself";
         $scope.alerts.errorFlag = true;
      }


   }


   function getData (){
      $http({
	  		  method: 'GET',
	  		  url: './server/rank.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},

	  		}).then(function successCallback(response) {
	  			   $scope.data = response.data;
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});
   }
});
