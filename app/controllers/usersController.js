myApp.controller("usersController",function(loggedUserSvc,$scope,$http,$location,$rootScope,$httpParamSerializerJQLike){


   $scope.data = [];
   getData();
   $scope.pageSize = 8;
   $scope.currentPage = 1;
   $scope.searchWord = '';


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
                     alert(response.data.error)
                  }
   	  		  }, function errorCallback(response) {
   	  			console.log("ERROR");
     		    console.log(response.data);
   	  		});
      }else{
         console.log("You cant invite yourself");
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
