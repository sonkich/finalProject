myApp.controller("friendsController",function($location ,$http, $httpParamSerializerJQLike,$scope,loggedUserSvc,friendsSvc){
   $scope.requests = [];
   $scope.friends = [];
   updateRequests();
   updateFriends();

   $scope.reject = function(index){
      var data = {
         "receiver" : loggedUserSvc.getInfo().username,
         "sender" : $scope.requests[index].sender
      }

      $http({
	  		  method: 'POST',
	  		  url: './server/rejectRequest.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(data)
	  		}).then(function successCallback(response) {
            updateRequests();
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		});
   }
   function updateRequests(){
      var data = {
         "username" : loggedUserSvc.getInfo().username
      }
      $http({
	  		  method: 'POST',
	  		  url: './server/getFriendRequests.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(data)
	  		}).then(function successCallback(response) {
            $scope.requests = response.data;
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		});
   }

   $scope.accept = function(index){
      var data = {
         "receiver" : loggedUserSvc.getInfo().username,
         "sender" : $scope.requests[index].sender
      }

      $http({
	  		  method: 'POST',
	  		  url: './server/acceptRequest.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(data)
	  		}).then(function successCallback(response) {
            updateRequests();
            updateFriends();
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		});
   }
   function updateFriends(){
      var data = {
         "username" : loggedUserSvc.getInfo().username
      }
      $http({
           method: 'POST',
           url: './server/getFriends.php',
           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
           data : $httpParamSerializerJQLike(data)
         }).then(function successCallback(response) {
            $scope.friends = response.data;
           }, function errorCallback(response) {
            console.log("ERROR");
         });
   }

   $scope.viewProfil = function(index){
      var string = "/users/" + $scope.friends[index].username2;

      $location.path(string);
   }

   $scope.removeFriend = function(index){
      var data = {
         "receiver" : loggedUserSvc.getInfo().username,
         "sender" : $scope.friends[index].username2
      }

      $http({
	  		  method: 'POST',
	  		  url: './server/removeFriend.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(data)
	  		}).then(function successCallback(response) {
            updateFriends();
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		});
   }
});
