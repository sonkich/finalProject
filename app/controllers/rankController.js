myApp.controller("rankController",function($scope,$http,$location,$rootScope){


   $scope.data = [];
   getData();
   $scope.pageSize = 5;
   $scope.currentPage = 1;


   $scope.openProfil = function(index) {
      var string = '/users/' + $scope.data[index].username;
       $location.path(string);
   }

   $scope.sendFriendRequest = function(index) {
      var sendingData = {};
      sendingData.receiver = $scope.data[index].username;
      sendingData.sender = $rootScope.parent;

      if(sendingData.receiver != sendingData.sender){
         $http({
   	  		  method: 'POST',
   	  		  url: './server/rank.php',
   	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data : $httpParamSerializerJQLike(sendingData)

   	  		}).then(function successCallback(response) {
   	  			   console.log(response);
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
