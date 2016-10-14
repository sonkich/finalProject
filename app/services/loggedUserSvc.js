myApp.factory("loggedUserSvc", function($http, $httpParamSerializerJQLike,$location){
	var userInfo = {
			'username': '',
			'logged': false,
         'is_alive': ''
	};

   var getInfo = function(){
      return userInfo;
   }

   var clearInfo = function(){

   }

   var setInfo = function(username){
      var data = {
         "username" : username
      }
      $http({
	  		  method: 'POST',
	  		  url: './server/getUserInfo.php',
	  		  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	  		  data : $httpParamSerializerJQLike(data)
	  		}).then(function successCallback(response) {

	  			userInfo.username = username;
            userInfo.logged = true;
            userInfo.is_alive = (response.data.isAlive)? response.data.isAlive : -1;
            
            $location.path('/users/' + userInfo.username);


	  		  }, function errorCallback(response) {
	  			console.log("ERROR");
	  		    console.log(response.data);
	  		});

   }

	return {
		getInfo : getInfo,
      setInfo : setInfo
	};
});
