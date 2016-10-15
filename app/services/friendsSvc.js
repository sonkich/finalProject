myApp.factory("friendsSvc", function(loggedUserSvc,$http, $httpParamSerializerJQLike){
	var requests = {};
   var friends = {};

   var getRequests = function(){


      var data = {
         "username" : loggedUserSvc.getInfo().username
      }
      $http({
	  		  method: 'POST',
	  		  url: './server/getFriendRequests.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(data)
	  		}).then(function successCallback(response) {
            requests = response.data;
	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		});


   }

   

   var getFriends = function(){
      return userInfo;
   }


	return {
		getRequests : getRequests,
      getFriends : getFriends
	};
});
